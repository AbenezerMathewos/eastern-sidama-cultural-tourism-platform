const mongoose = require('mongoose');

const experienceGuideApplicationSchema = new mongoose.Schema(
  {
    experience: {
      type: mongoose.Schema.ObjectId,
      ref: 'Experience',
      required: [true, 'Application must belong to an experience']
    },
    guide: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Application must belong to a guide']
    },
    message: {
      type: String,
      trim: true,
      maxlength: 500
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    reviewedAt: Date,
    rejectionReason: String
  },
  { timestamps: true }
);

experienceGuideApplicationSchema.index({ experience: 1, guide: 1 }, { unique: true });
experienceGuideApplicationSchema.index({ guide: 1, status: 1 });
experienceGuideApplicationSchema.index({ experience: 1, status: 1 });

const ExperienceGuideApplication = mongoose.model(
  'ExperienceGuideApplication',
  experienceGuideApplicationSchema
);

module.exports = ExperienceGuideApplication;
