const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Notification must belong to a user']
    },
    type: {
      type: String,
      enum: [
        'booking_confirmed',
        'host_application_approved',
        'host_application_rejected',
        'guide_application_approved',
        'guide_application_rejected',
        'guide_assigned',
        'withdrawal_created',
        'withdrawal_paid',
        'withdrawal_failed',
        'review_received',
        'upcoming_experience_reminder',
        'guide_experience_application',
        'guide_experience_approved',
        'guide_experience_rejected',
        'guide_booking_assigned',
        'new_message'
      ],
      required: [true, 'Notification type is required']
    },
    title: {
      type: String,
      required: [true, 'Notification title is required'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Notification message is required'],
      trim: true
    },
    link: {
      type: String,
      trim: true
    },
    readAt: Date,
    dedupeKey: {
      type: String,
      trim: true
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },
  {
    timestamps: true
  }
);

notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, readAt: 1 });
notificationSchema.index(
  { recipient: 1, dedupeKey: 1 },
  {
    unique: true,
    partialFilterExpression: { dedupeKey: { $type: 'string' } }
  }
);

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
