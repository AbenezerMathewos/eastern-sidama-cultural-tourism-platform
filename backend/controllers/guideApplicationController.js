const GuideApplication = require('./../models/guideApplicationModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');
const { cloudinary } = require('./../utils/multerConfig');
const {
  notifyGuideApplicationApproved,
  notifyGuideApplicationRejected
} = require('../services/notificationService');

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

// Helper function to delete Cloudinary assets
const deleteCloudinaryAssets = async (urls) => {
  if (!urls || urls.length === 0) return;
  
  const urlArray = Array.isArray(urls) ? urls : [urls];
  
  for (const url of urlArray) {
    if (!url) continue;
    try {
      // Extract public_id from Cloudinary URL
      const parts = url.split('/');
      const filename = parts[parts.length - 1];
      const publicId = `etxplore/guide-applications/${filename.split('.')[0]}`;
      
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      // Log error but don't block rejection
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error deleting Cloudinary asset:', err);
      }
    }
  }
};

// Create or update guide application (Step 1: Personal Info)
exports.createOrUpdateApplication = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  // Check if user already has an approved guide status
  const user = await User.findById(userId);
  if (user.guideStatus === 'approved') {
    return next(new AppError('You are already an approved guide', 400));
  }

  const applicationData = {
    user: userId,
    personalInfo: req.body.personalInfo,
    status: 'draft'
  };

  // Find existing draft application or create new one
  let application = await GuideApplication.findOne({
    user: userId,
    status: { $in: ['draft', 'submitted', 'pending'] }
  });

  if (application) {
    // Update existing application
    application.personalInfo = { ...application.personalInfo, ...applicationData.personalInfo };
    await application.save();
  } else {
    // Create new application
    application = await GuideApplication.create(applicationData);
  }

  res.status(200).json({
    status: 'success',
    data: {
      application
    }
  });
});

// Update application with experience details (Step 2)
exports.updateExperienceDetails = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const application = await GuideApplication.findOne({
    user: userId,
    status: { $in: ['draft', 'submitted', 'pending'] }
  });

  if (!application) {
    return next(new AppError('No active guide application found', 404));
  }

  application.experienceDetails = req.body.experienceDetails || application.experienceDetails;
  await application.save();

  res.status(200).json({
    status: 'success',
    data: {
      application
    }
  });
});

// Update application with media (Step 3)
exports.updateMedia = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const application = await GuideApplication.findOne({
    user: userId,
    status: { $in: ['draft', 'submitted', 'pending'] }
  });

  if (!application) {
    return next(new AppError('No active guide application found', 404));
  }

  application.media = req.body.media || application.media;
  await application.save();

  res.status(200).json({
    status: 'success',
    data: {
      application
    }
  });
});

// Process uploaded media files (Step 3 - File Upload)
exports.processGuideMediaUpload = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  // Find or create application
  let application = await GuideApplication.findOne({
    user: userId,
    status: { $in: ['draft', 'submitted', 'pending'] }
  });

  if (!application) {
    // Create new application if it doesn't exist
    application = await GuideApplication.create({
      user: userId,
      status: 'draft'
    });
  }

  // Extract uploaded file URLs from Cloudinary
  const media = {};

  if (req.files) {
    if (req.files.nationalIdFront && req.files.nationalIdFront[0]) {
      media.nationalIdFront = toStoredFileUrl(req.files.nationalIdFront[0]);
    }

    if (req.files.nationalIdBack && req.files.nationalIdBack[0]) {
      media.nationalIdBack = toStoredFileUrl(req.files.nationalIdBack[0]);
    }

    if (req.files.personalPhoto && req.files.personalPhoto[0]) {
      media.personalPhoto = toStoredFileUrl(req.files.personalPhoto[0]);
    }

    if (req.files.tourGuideCertificate && req.files.tourGuideCertificate[0]) {
      media.tourGuideCertificate = toStoredFileUrl(req.files.tourGuideCertificate[0]);
    }
  }

  // Update media fields
  application.media = {
    ...application.media,
    ...media
  };

  await application.save();

  res.status(200).json({
    status: 'success',
    message: 'Media uploaded successfully',
    data: {
      application,
      uploadedFiles: {
        nationalIdFront: media.nationalIdFront || null,
        nationalIdBack: media.nationalIdBack || null,
        personalPhoto: media.personalPhoto || null,
        tourGuideCertificate: media.tourGuideCertificate || null
      }
    }
  });
});

// Reapply after rejection - reset rejected application to draft
exports.reapplyApplication = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const application = await GuideApplication.findOne({
    user: userId,
    status: 'rejected'
  });

  if (!application) {
    return next(new AppError('No rejected application found', 404));
  }

  // Reset application to draft status
  application.status = 'draft';
  application.submittedAt = undefined;
  application.reviewedAt = undefined;
  application.reviewedBy = undefined;
  application.rejectionReason = undefined;
  
  // Clear media fields (user will need to re-upload)
  application.media = {
    nationalIdFront: undefined,
    nationalIdBack: undefined,
    personalPhoto: undefined,
    tourGuideCertificate: undefined
  };
  
  await application.save();

  // Update user guideStatus back to none
  const user = await User.findById(userId);
  user.guideStatus = 'none';
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'You can now update and resubmit your application',
    data: {
      application
    }
  });
});

// Submit application for review
exports.submitApplication = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const application = await GuideApplication.findOne({
    user: userId,
    status: { $in: ['draft', 'submitted'] }
  });

  if (!application) {
    return next(new AppError('No guide application found', 404));
  }

  // Validate that all required fields are filled
  if (!application.personalInfo?.fullName ||
      !application.personalInfo?.email ||
      !application.personalInfo?.phoneNumber ||
      !application.personalInfo?.cityRegion ||
      !application.personalInfo?.aboutYou ||
      !application.personalInfo?.languagesSpoken || 
      application.personalInfo.languagesSpoken.length === 0) {
    return next(new AppError('Please complete all required fields before submitting', 400));
  }

  // Validate required media uploads
  if (!application.media?.nationalIdFront ||
      !application.media?.nationalIdBack ||
      !application.media?.personalPhoto ||
      !application.media?.tourGuideCertificate) {
    return next(new AppError('Please upload all required media: National ID (front and back), personal photo, and tour guide certificate', 400));
  }

  // Update application status
  application.status = 'pending';
  application.submittedAt = new Date();

  // Update user guideStatus
  const user = await User.findById(userId);
  user.guideStatus = 'pending';
  user.guideApplicationDate = new Date();
  await user.save({ validateBeforeSave: false });

  await application.save();

  res.status(200).json({
    status: 'success',
    message: 'Guide application submitted successfully',
    data: {
      application
    }
  });
});

// Get user's application
exports.getMyApplication = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const application = await GuideApplication.findOne({
    user: userId
  }).populate('user', 'name email');

  if (!application) {
    return res.status(200).json({
      status: 'success',
      data: {
        application: null
      }
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      application
    }
  });
});

// Get any user's application (Admin only)
exports.getUserApplication = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  // Find the most recent application for this user (approved or submitted)
  const application = await GuideApplication.findOne({
    user: userId,
    status: { $in: ['approved', 'submitted', 'pending'] }
  })
  .sort('-createdAt')
  .populate('user', 'name email photo');

  if (!application) {
    return res.status(404).json({
      status: 'fail',
      message: 'No application found for this user'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      application
    }
  });
});

// Get all pending applications (Admin only)
exports.getAllPendingApplications = catchAsync(async (req, res, next) => {
  const applications = await GuideApplication.find({ status: 'pending' })
    .populate('user', 'name email photo')
    .sort('-submittedAt');

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: {
      applications
    }
  });
});

// Approve guide application (Admin only)
exports.approveApplication = catchAsync(async (req, res, next) => {
  const application = await GuideApplication.findById(req.params.id)
    .populate('user');

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  if (application.status !== 'pending') {
    return next(new AppError('Application is not pending', 400));
  }

  // Update application
  application.status = 'approved';
  application.reviewedAt = new Date();
  application.reviewedBy = req.user.id;

  // Update user guideStatus and location
  const user = await User.findById(application.user._id);
  user.guideStatus = 'approved';
  // Set location from personalInfo.cityRegion
  if (application.personalInfo?.cityRegion) {
    user.location = application.personalInfo.cityRegion;
  }
  await user.save({ validateBeforeSave: false });

  await application.save();

  res.status(200).json({
    status: 'success',
    message: 'Guide application approved',
    data: {
      application
    }
  });

  notifyGuideApplicationApproved(user).catch(err => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error creating guide approval notification:', err);
    }
  });

  // Send approval email in background so slow SMTP does not block API response.
  const frontendBase = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.replace(/\/$/, '')
    : 'http://localhost:8080';
  const dashboardURL = `${frontendBase}/guide/dashboard`;
  new Email(user, dashboardURL).sendHostApproval().catch(err => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error sending guide approval email:', err);
    }
  }); // Reuse host approval email template
});

// Reject guide application (Admin only)
exports.rejectApplication = catchAsync(async (req, res, next) => {
  const application = await GuideApplication.findById(req.params.id)
    .populate('user');

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  if (application.status !== 'pending') {
    return next(new AppError('Application is not pending', 400));
  }

  // Delete uploaded media from Cloudinary
  if (application.media) {
    const mediaUrls = [
      application.media.nationalIdFront,
      application.media.nationalIdBack,
      application.media.personalPhoto,
      application.media.tourGuideCertificate
    ].filter(Boolean);
    
    await deleteCloudinaryAssets(mediaUrls);
  }

  // Update application
  application.status = 'rejected';
  application.reviewedAt = new Date();
  application.reviewedBy = req.user.id;
  application.rejectionReason = req.body.rejectionReason || 'Application rejected';

  // Update user guideStatus
  const user = await User.findById(application.user._id);
  user.guideStatus = 'rejected';
  await user.save({ validateBeforeSave: false });

  await application.save();

  res.status(200).json({
    status: 'success',
    message: 'Guide application rejected',
    data: {
      application
    }
  });

  notifyGuideApplicationRejected(user, application.rejectionReason).catch(err => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error creating guide rejection notification:', err);
    }
  });
});
