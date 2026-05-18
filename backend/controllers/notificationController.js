const Notification = require('../models/notificationModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {
  notifyUpcomingExperienceReminder
} = require('../services/notificationService');

const maybeCreateUpcomingReminders = async userId => {
  const bookings = await Booking.find({ user: userId }).limit(100);

  await Promise.all(
    bookings.map(booking => notifyUpcomingExperienceReminder(userId, booking))
  );
};

exports.getMine = catchAsync(async (req, res, next) => {
  await maybeCreateUpcomingReminders(req.user._id);

  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 20));

  const [notifications, unreadCount] = await Promise.all([
    Notification.find({ recipient: req.user._id })
      .sort({ createdAt: -1 })
      .limit(limit),
    Notification.countDocuments({ recipient: req.user._id, readAt: null })
  ]);

  res.status(200).json({
    status: 'success',
    results: notifications.length,
    unreadCount,
    data: {
      notifications
    }
  });
});

exports.markRead = catchAsync(async (req, res, next) => {
  const notification = await Notification.findOneAndUpdate(
    {
      _id: req.params.id,
      recipient: req.user._id
    },
    { readAt: new Date() },
    { new: true }
  );

  if (!notification) {
    return next(new AppError('Notification not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      notification
    }
  });
});

exports.markAllRead = catchAsync(async (req, res, next) => {
  await Notification.updateMany(
    {
      recipient: req.user._id,
      readAt: null
    },
    { readAt: new Date() }
  );

  res.status(200).json({
    status: 'success',
    message: 'Notifications marked as read'
  });
});
