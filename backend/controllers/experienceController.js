const Experience = require('./../models/experienceModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

const toStoredFileUrl = file => {
  if (!file) return null;
  if (file.path && /^https?:\/\//i.test(file.path)) return file.path;
  if (file.destination && file.filename) {
    const normalizedDest = file.destination.replace(/\\/g, '/');
    const marker = '/public/';
    const idx = normalizedDest.indexOf(marker);
    if (idx !== -1) {
      const publicSubPath = normalizedDest.slice(idx + marker.length);
      return `/${publicSubPath}/${file.filename}`.replace(/\/+/g, '/');
    }
  }
  return file.path || null;
};

// Middleware to set top 5 cheap tours
exports.aliasTopExperiences = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'title,price,ratingsAverage,summary';
  next();
};

exports.getAllExperiences = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.experienceId) filter = { experience: req.params.experienceId };
  if (req.query.host) filter.host = req.query.host;
  if (req.query.status) filter.status = req.query.status;

  let query;

  // 1. ADMIN: Sees everything
  if (req.user && req.user.role === 'admin') {
    query = Experience.find(filter).setOptions({ bypassApprovedFilter: true });
  }
  // 2. HOST: Sees their own tours
  else if (req.user && req.user.hostStatus === 'approved') {
    query = Experience.find({ ...filter, host: req.user._id }).setOptions({
      bypassApprovedFilter: true
    });
  }
  // 3. PUBLIC: Only see approved tours
  else {
    query = Experience.find(filter);
  }

  query = query.select('+status');
  const doc = await query;

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: { data: doc }
  });
});

exports.getExperience = factory.getOne(Experience, { path: 'reviews' });

exports.createExperience = catchAsync(async (req, res, next) => {
  req.body.host = req.user.id;

  if (req.user.role === 'admin' && !req.body.status) {
    req.body.status = 'approved';
  }

  if (!req.body.startLocation) {
    req.body.startLocation = {
      type: 'Point',
      coordinates: [38.7578, 8.9806],
      address: req.body.location || 'Unknown Location',
      description: req.body.summary || 'Tour Location'
    };
  }

  const doc = await Experience.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { data: doc }
  });
});

exports.uploadExperienceImage = catchAsync(async (req, res, next) => {
  const imageUrl = toStoredFileUrl(req.file);

  if (!imageUrl) {
    return next(new AppError('Please upload an image file', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      imageCover: imageUrl
    }
  });
});

exports.updateExperience = catchAsync(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id)
    .setOptions({ bypassApprovedFilter: true })
    .select('host');

  if (!experience)
    return next(new AppError('No experience found with that ID', 404));

  let updateBody = req.body;

  if (req.user.role !== 'admin') {
    const ownExperience = await Experience.findOne({
      _id: req.params.id,
      host: req.user._id
    })
      .setOptions({ bypassApprovedFilter: true })
      .select('_id');

    if (!ownExperience) {
      return next(new AppError('You can only update your own experiences', 403));
    }

    const allowedFields = [
      'title',
      'description',
      'summary',
      'price',
      'duration',
      'maxGuests',
      'location',
      'locationCoordinates',
      'imageCover',
      'images',
      'startLocation',
      'guideRequirement'
    ];

    updateBody = allowedFields.reduce((body, field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        body[field] = req.body[field];
      }
      return body;
    }, {});
  }

  const doc = await Experience.findByIdAndUpdate(req.params.id, updateBody, {
    new: true,
    runValidators: true
  })
    .setOptions({ bypassApprovedFilter: true })
    .select('+status');

  res.status(200).json({ status: 'success', data: { data: doc } });
});

exports.approveExperience = catchAsync(async (req, res, next) => {
  const experience = await Experience.findByIdAndUpdate(
    req.params.id,
    { status: 'approved' },
    { new: true, runValidators: true }
  )
    .setOptions({ bypassApprovedFilter: true })
    .select('+status');

  if (!experience) return next(new AppError('No tour found with that ID', 404));
  res.status(200).json({ status: 'success', data: { data: experience } });
});

exports.rejectExperience = catchAsync(async (req, res, next) => {
  const experience = await Experience.findByIdAndUpdate(
    req.params.id,
    { status: 'rejected' },
    { new: true }
  )
    .setOptions({ bypassApprovedFilter: true })
    .select('+status');

  res.status(200).json({ status: 'success', data: { data: experience } });
});

exports.deleteExperience = catchAsync(async (req, res, next) => {
  const experience = await Experience.findById(req.params.id)
    .setOptions({ bypassApprovedFilter: true })
    .select('host');

  if (!experience) {
    return next(new AppError('No experience found with that ID', 404));
  }

  if (req.user.role !== 'admin') {
    const ownExperience = await Experience.findOne({
      _id: req.params.id,
      host: req.user._id
    })
      .setOptions({ bypassApprovedFilter: true })
      .select('_id');

    if (!ownExperience) {
      return next(new AppError('You can only delete your own experiences', 403));
    }
  }

  await Experience.findByIdAndDelete(req.params.id).setOptions({
    bypassApprovedFilter: true
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getExperienceStats = catchAsync(async (req, res, next) => {
  const stats = await Experience.aggregate([
    { $match: { ratingsAverage: { $gte: 4.5 }, status: 'approved' } },
    {
      $group: {
        _id: null,
        numExperiences: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' }
      }
    }
  ]);
  res.status(200).json({ status: 'success', data: { stats } });
});

exports.getAllPendingExperiences = catchAsync(async (req, res, next) => {
  const experiences = await Experience.find({ status: 'pending' })
    .setOptions({ bypassApprovedFilter: true })
    .select('+status')
    .sort({ createdAt: -1 });
  res.status(200).json({
    status: 'success',
    results: experiences.length,
    data: { data: experiences }
  });
});

// --- ADDED MISSING FUNCTIONS TO PREVENT CRASH ---

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Experience.aggregate([
    { $unwind: '$startDates' },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$title' }
      }
    },
    { $addFields: { month: '$_id' } },
    { $project: { _id: 0 } },
    { $sort: { numTourStarts: -1 } }
  ]);

  res.status(200).json({ status: 'success', data: { plan } });
});

exports.getExperiencesWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng)
    return next(
      new AppError(
        'Please provide latitude and longitude in format lat,lng.',
        400
      )
    );

  const experiences = await Experience.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    status: 'success',
    results: experiences.length,
    data: { data: experiences }
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng)
    return next(
      new AppError(
        'Please provide latitude and longitude in format lat,lng.',
        400
      )
    );

  const distances = await Experience.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [lng * 1, lat * 1] },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    { $project: { distance: 1, title: 1 } }
  ]);

  res.status(200).json({ status: 'success', data: { data: distances } });
});
