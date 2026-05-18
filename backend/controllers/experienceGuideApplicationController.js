const Experience = require('../models/experienceModel');
const ExperienceGuideApplication = require('../models/experienceGuideApplicationModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {
  notifyGuideExperienceApplication,
  notifyGuideExperienceApplicationApproved,
  notifyGuideExperienceApplicationRejected
} = require('../services/notificationService');

const assertApprovedGuide = user => {
  if (!user || user.guideStatus !== 'approved') {
    throw new AppError('You must be an approved guide', 403);
  }
};

const assertExperienceHost = (experience, userId) => {
  const hostId = experience.host._id || experience.host;
  if (String(hostId) !== String(userId)) {
    throw new AppError('Only the experience host can perform this action', 403);
  }
};

exports.getOpenExperiences = catchAsync(async (req, res, next) => {
  assertApprovedGuide(req.user);

  const experiences = await Experience.find({
    status: 'approved',
    guideRequirement: { $in: ['required', 'optional'] }
  })
    .select('title summary location price duration imageCover guideRequirement host approvedGuides')
    .populate('host', 'name photo location');

  const myApplications = await ExperienceGuideApplication.find({
    guide: req.user._id
  }).select('experience status');

  const applicationMap = {};
  myApplications.forEach(app => {
    applicationMap[String(app.experience)] = app.status;
  });

  const data = experiences.map(exp => ({
    ...exp.toObject(),
    myApplicationStatus: applicationMap[String(exp._id)] || null
  }));

  res.status(200).json({
    status: 'success',
    results: data.length,
    data: { experiences: data }
  });
});

exports.applyToExperience = catchAsync(async (req, res, next) => {
  assertApprovedGuide(req.user);

  const experience = await Experience.findById(req.params.experienceId).select(
    'title host guideRequirement status'
  );

  if (!experience || experience.status !== 'approved') {
    return next(new AppError('Experience not found', 404));
  }

  if (experience.guideRequirement === 'none') {
    return next(
      new AppError('This experience does not require a guide', 400)
    );
  }

  const existing = await ExperienceGuideApplication.findOne({
    experience: experience._id,
    guide: req.user._id
  });

  if (existing && existing.status !== 'rejected') {
    return next(
      new AppError('You have already applied to this experience', 400)
    );
  }

  let application;
  if (existing) {
    existing.status = 'pending';
    existing.message = req.body.message;
    existing.reviewedAt = undefined;
    existing.rejectionReason = undefined;
    application = await existing.save();
  } else {
    application = await ExperienceGuideApplication.create({
      experience: experience._id,
      guide: req.user._id,
      message: req.body.message
    });
  }

  res.status(201).json({
    status: 'success',
    data: { application }
  });

  const host = await User.findById(experience.host);
  if (host) {
    notifyGuideExperienceApplication(host, req.user, experience).catch(() => {});
  }
});

exports.getMyApplications = catchAsync(async (req, res, next) => {
  assertApprovedGuide(req.user);

  const applications = await ExperienceGuideApplication.find({
    guide: req.user._id
  })
    .populate({
      path: 'experience',
      select: 'title location imageCover guideRequirement host',
      populate: { path: 'host', select: 'name email photo' }
    })
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: { applications }
  });
});

exports.getApplicationsForExperience = catchAsync(async (req, res, next) => {
  const experience = await Experience.findById(req.params.experienceId)
    .setOptions({ bypassApprovedFilter: true })
    .select('host title');

  if (!experience) {
    return next(new AppError('Experience not found', 404));
  }

  if (req.user.role !== 'admin') {
    assertExperienceHost(experience, req.user._id);
  }

  const applications = await ExperienceGuideApplication.find({
    experience: experience._id
  })
    .populate('guide', 'name email photo location guideStatus')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: { applications }
  });
});

exports.approveApplication = catchAsync(async (req, res, next) => {
  const application = await ExperienceGuideApplication.findById(
    req.params.id
  ).populate('guide experience');

  if (!application) {
    return next(new AppError('Application not found', 404));
  }

  const experience = await Experience.findById(application.experience._id)
    .setOptions({ bypassApprovedFilter: true })
    .select('host title approvedGuides');

  if (!experience) {
    return next(new AppError('Experience not found', 404));
  }

  if (req.user.role !== 'admin') {
    assertExperienceHost(experience, req.user._id);
  }

  if (application.status !== 'pending') {
    return next(new AppError('Application is not pending', 400));
  }

  application.status = 'approved';
  application.reviewedAt = new Date();
  await application.save();

  const guideId = application.guide._id;
  if (!experience.approvedGuides.some(id => String(id) === String(guideId))) {
    experience.approvedGuides.push(guideId);
    await experience.save({ validateBeforeSave: false });
  }

  res.status(200).json({
    status: 'success',
    message: 'Guide approved for this experience',
    data: { application }
  });

  notifyGuideExperienceApplicationApproved(
    application.guide,
    experience
  ).catch(() => {});
});

exports.rejectApplication = catchAsync(async (req, res, next) => {
  const application = await ExperienceGuideApplication.findById(
    req.params.id
  ).populate('guide experience');

  if (!application) {
    return next(new AppError('Application not found', 404));
  }

  const experience = await Experience.findById(application.experience._id)
    .setOptions({ bypassApprovedFilter: true })
    .select('host title');

  if (!experience) {
    return next(new AppError('Experience not found', 404));
  }

  if (req.user.role !== 'admin') {
    assertExperienceHost(experience, req.user._id);
  }

  application.status = 'rejected';
  application.reviewedAt = new Date();
  application.rejectionReason =
    req.body.rejectionReason || 'Application rejected by host';
  await application.save();

  res.status(200).json({
    status: 'success',
    message: 'Guide application rejected',
    data: { application }
  });

  notifyGuideExperienceApplicationRejected(
    application.guide,
    experience,
    application.rejectionReason
  ).catch(() => {});
});

exports.getSelectableGuides = catchAsync(async (req, res, next) => {
  const experience = await Experience.findById(req.params.experienceId)
    .populate('approvedGuides', 'name photo email location guideStatus')
    .populate({
      path: 'host',
      select: 'name assignedGuide',
      populate: {
        path: 'assignedGuide',
        select: 'name photo email location guideStatus'
      }
    });

  if (!experience || experience.status !== 'approved') {
    return next(new AppError('Experience not found', 404));
  }

  const guidesMap = new Map();

  (experience.approvedGuides || []).forEach(guide => {
    if (guide && guide.guideStatus === 'approved') {
      guidesMap.set(String(guide._id), guide);
    }
  });

  const hostAssigned = experience.host?.assignedGuide;
  if (hostAssigned && hostAssigned.guideStatus === 'approved') {
    guidesMap.set(String(hostAssigned._id), hostAssigned);
  }

  res.status(200).json({
    status: 'success',
    data: {
      guideRequirement: experience.guideRequirement,
      guides: Array.from(guidesMap.values())
    }
  });
});
