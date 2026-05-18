const Notification = require('../models/notificationModel');

const getUserId = userOrId => {
  if (!userOrId) return null;
  return userOrId._id || userOrId.id || userOrId;
};

const createNotification = async ({
  recipient,
  type,
  title,
  message,
  link,
  metadata,
  dedupeKey
}) => {
  const recipientId = getUserId(recipient);
  if (!recipientId) return null;

  try {
    return await Notification.create({
      recipient: recipientId,
      type,
      title,
      message,
      link,
      metadata,
      dedupeKey
    });
  } catch (err) {
    if (err && err.code === 11000) return null;
    throw err;
  }
};

async function notifyWithdrawalCreated(user, withdrawal) {
  return createNotification({
    recipient: user,
    type: 'withdrawal_created',
    title: 'Withdrawal requested',
    message: `Your withdrawal request for ETB ${(withdrawal.amountCents / 100).toFixed(2)} was submitted.`,
    link: '/host/withdrawals',
    metadata: { withdrawal: withdrawal._id },
    dedupeKey: `withdrawal_created:${withdrawal._id}`
  });
}

async function notifyWithdrawalPaid(user, withdrawal) {
  return createNotification({
    recipient: user,
    type: 'withdrawal_paid',
    title: 'Withdrawal paid',
    message: `Your withdrawal for ETB ${(withdrawal.amountCents / 100).toFixed(2)} was marked as paid.`,
    link: '/host/withdrawals',
    metadata: { withdrawal: withdrawal._id },
    dedupeKey: `withdrawal_paid:${withdrawal._id}`
  });
}

async function notifyWithdrawalFailed(user, withdrawal) {
  return createNotification({
    recipient: user,
    type: 'withdrawal_failed',
    title: 'Withdrawal failed',
    message: `Your withdrawal could not be completed. ${withdrawal.failureReason || ''}`.trim(),
    link: '/host/withdrawals',
    metadata: { withdrawal: withdrawal._id },
    dedupeKey: `withdrawal_failed:${withdrawal._id}`
  });
}

async function notifyBookingConfirmed(user, booking, experience) {
  return createNotification({
    recipient: user,
    type: 'booking_confirmed',
    title: 'Booking confirmed',
    message: `Your booking for ${experience.title} is confirmed.`,
    link: '/my-bookings',
    metadata: { booking: booking._id, experience: experience._id },
    dedupeKey: `booking_confirmed:${booking._id}:${getUserId(user)}`
  });
}

async function notifyHostApplicationApproved(user) {
  return createNotification({
    recipient: user,
    type: 'host_application_approved',
    title: 'Host application approved',
    message: 'Your host application was approved. You can now manage your hosting experience.',
    link: '/profile',
    dedupeKey: `host_application_approved:${getUserId(user)}`
  });
}

async function notifyHostApplicationRejected(user, reason) {
  return createNotification({
    recipient: user,
    type: 'host_application_rejected',
    title: 'Host application rejected',
    message: reason ? `Your host application was rejected: ${reason}` : 'Your host application was rejected.',
    link: '/host-application',
    dedupeKey: `host_application_rejected:${getUserId(user)}:${Date.now()}`
  });
}

async function notifyGuideApplicationApproved(user) {
  return createNotification({
    recipient: user,
    type: 'guide_application_approved',
    title: 'Guide application approved',
    message: 'Your guide application was approved. You can now view your guide dashboard.',
    link: '/guide/dashboard',
    dedupeKey: `guide_application_approved:${getUserId(user)}`
  });
}

async function notifyGuideApplicationRejected(user, reason) {
  return createNotification({
    recipient: user,
    type: 'guide_application_rejected',
    title: 'Guide application rejected',
    message: reason ? `Your guide application was rejected: ${reason}` : 'Your guide application was rejected.',
    link: '/guide-application',
    dedupeKey: `guide_application_rejected:${getUserId(user)}:${Date.now()}`
  });
}

async function notifyGuideAssigned(host, guide) {
  const notifications = [
    createNotification({
      recipient: host,
      type: 'guide_assigned',
      title: 'Guide assigned',
      message: `${guide.name} has been assigned as your guide.`,
      link: '/profile',
      metadata: { guide: getUserId(guide) },
      dedupeKey: `guide_assigned:host:${getUserId(host)}:${getUserId(guide)}`
    }),
    createNotification({
      recipient: guide,
      type: 'guide_assigned',
      title: 'New host assigned',
      message: `You have been assigned to support ${host.name}.`,
      link: '/guide/dashboard',
      metadata: { host: getUserId(host) },
      dedupeKey: `guide_assigned:guide:${getUserId(guide)}:${getUserId(host)}`
    })
  ];

  return Promise.all(notifications);
}

async function notifyReviewReceived(host, review, experience) {
  return createNotification({
    recipient: host,
    type: 'review_received',
    title: 'New review received',
    message: `Your experience ${experience.title} received a ${review.rating || ''}-star review.`,
    link: `/tours/${experience._id}`,
    metadata: { review: review._id, experience: experience._id },
    dedupeKey: `review_received:${review._id}`
  });
}

async function notifyUpcomingExperienceReminder(user, booking) {
  const experience = booking.experience;
  const scheduledAt = booking.startDate || booking.date || experience?.startDate || experience?.date;
  if (!scheduledAt) return null;

  const scheduledDate = new Date(scheduledAt);
  if (Number.isNaN(scheduledDate.getTime())) return null;

  const now = Date.now();
  const reminderWindowMs = 24 * 60 * 60 * 1000;
  const timeUntilStart = scheduledDate.getTime() - now;
  if (timeUntilStart <= 0 || timeUntilStart > reminderWindowMs) return null;

  return createNotification({
    recipient: user,
    type: 'upcoming_experience_reminder',
    title: 'Upcoming experience reminder',
    message: `Your experience ${experience?.title || 'booking'} is coming up soon.`,
    link: '/my-bookings',
    metadata: { booking: booking._id, experience: experience?._id },
    dedupeKey: `upcoming_experience_reminder:${booking._id}`
  });
}

async function notifyGuideExperienceApplication(host, guide, experience) {
  return createNotification({
    recipient: host,
    type: 'guide_experience_application',
    title: 'New guide application',
    message: `${guide.name} applied to guide your experience "${experience.title}".`,
    link: '/admin/experiences',
    metadata: { experience: experience._id, guide: getUserId(guide) },
    dedupeKey: `guide_experience_application:${experience._id}:${getUserId(guide)}`
  });
}

async function notifyGuideExperienceApplicationApproved(guide, experience) {
  return createNotification({
    recipient: guide,
    type: 'guide_experience_approved',
    title: 'Guide application approved',
    message: `You were approved to guide "${experience.title}".`,
    link: '/guide/dashboard',
    metadata: { experience: experience._id },
    dedupeKey: `guide_experience_approved:${experience._id}:${getUserId(guide)}`
  });
}

async function notifyGuideExperienceApplicationRejected(guide, experience, reason) {
  return createNotification({
    recipient: guide,
    type: 'guide_experience_rejected',
    title: 'Guide application rejected',
    message: reason
      ? `Your application for "${experience.title}" was rejected: ${reason}`
      : `Your application for "${experience.title}" was rejected.`,
    link: '/guide/dashboard',
    dedupeKey: `guide_experience_rejected:${experience._id}:${getUserId(guide)}:${Date.now()}`
  });
}

async function notifyGuideBookingAssigned(guideId, booking, experience) {
  return createNotification({
    recipient: guideId,
    type: 'guide_booking_assigned',
    title: 'New guided booking',
    message: `A new booking for "${experience.title}" is available for you to coordinate.`,
    link: '/guide/dashboard',
    metadata: { booking: booking._id, experience: experience._id },
    dedupeKey: `guide_booking_assigned:${booking._id}:${getUserId(guideId)}`
  });
}

async function notifyNewMessage(recipientId, sender, message) {
  const senderId = getUserId(sender);
  return createNotification({
    recipient: recipientId,
    type: 'new_message',
    title: 'New message',
    message: `${sender.name} sent you a message.`,
    link: `/messages?with=${senderId}`,
    metadata: { message: message._id, sender: senderId },
    dedupeKey: `new_message:${message._id}`
  });
}

module.exports = {
  createNotification,
  notifyWithdrawalCreated,
  notifyWithdrawalPaid,
  notifyWithdrawalFailed,
  notifyBookingConfirmed,
  notifyHostApplicationApproved,
  notifyHostApplicationRejected,
  notifyGuideApplicationApproved,
  notifyGuideApplicationRejected,
  notifyGuideAssigned,
  notifyReviewReceived,
  notifyUpcomingExperienceReminder,
  notifyGuideExperienceApplication,
  notifyGuideExperienceApplicationApproved,
  notifyGuideExperienceApplicationRejected,
  notifyGuideBookingAssigned,
  notifyNewMessage
};

