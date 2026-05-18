const Message = require('../models/messageModel');
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { notifyNewMessage } = require('../services/notificationService');

const toUserId = userOrId => {
  if (!userOrId) return null;
  return String(userOrId._id || userOrId.id || userOrId);
};

const hasSharedGuideBooking = async (userA, userB) => {
  const shared = await Booking.findOne({
    $or: [
      { user: userA, guide: userB },
      { user: userB, guide: userA }
    ]
  }).select('_id');

  return !!shared;
};

const canUsersCommunicate = async (userA, userB, bookingId) => {
  const userAId = toUserId(userA);
  const userBId = toUserId(userB);

  if (!userAId || !userBId || userAId === userBId) return false;

  if (bookingId) {
    const booking = await Booking.findById(bookingId).populate({
      path: 'experience',
      select: 'host'
    });

    if (!booking) return false;

    const visitorId = toUserId(booking.user);
    const guideId = toUserId(booking.guide);
    const hostId = toUserId(booking.experience?.host);
    const participants = [visitorId, guideId, hostId].filter(Boolean);

    return participants.includes(userAId) && participants.includes(userBId);
  }

  const [userAData, userBData] = await Promise.all([
    User.findById(userAId).select('role hostStatus guideStatus assignedGuide'),
    User.findById(userBId).select('role hostStatus guideStatus assignedGuide')
  ]);

  if (!userAData || !userBData) return false;

  if (userAData.role === 'admin' || userBData.role === 'admin') return true;

  // Approved hosts and certified guides may communicate freely
  if (
    userAData.hostStatus === 'approved' &&
    userBData.guideStatus === 'approved'
  ) {
    return true;
  }

  if (
    userAData.guideStatus === 'approved' &&
    userBData.hostStatus === 'approved'
  ) {
    return true;
  }

  // Visitor and guide linked by a booking
  if (await hasSharedGuideBooking(userAId, userBId)) {
    return true;
  }

  return false;
};

exports.sendMessage = catchAsync(async (req, res, next) => {
  const { recipientId, content, bookingId, experienceId } = req.body;

  if (!recipientId || !content?.trim()) {
    return next(new AppError('Recipient and message content are required', 400));
  }

  const allowed = await canUsersCommunicate(
    req.user._id,
    recipientId,
    bookingId
  );

  if (!allowed) {
    return next(
      new AppError('You cannot message this user in this context', 403)
    );
  }

  const message = await Message.create({
    sender: req.user._id,
    recipient: recipientId,
    content: content.trim(),
    booking: bookingId,
    experience: experienceId
  });

  await message.populate('sender', 'name photo');
  await message.populate('recipient', 'name photo');

  res.status(201).json({
    status: 'success',
    data: { message }
  });

  notifyNewMessage(recipientId, req.user, message).catch(() => {});
});

exports.getConversation = catchAsync(async (req, res, next) => {
  const otherUserId = req.params.userId;
  const { bookingId } = req.query;

  const allowed = await canUsersCommunicate(
    req.user._id,
    otherUserId,
    bookingId
  );

  if (!allowed) {
    return next(new AppError('You cannot view this conversation', 403));
  }

  const messages = await Message.find({
    $or: [
      { sender: req.user._id, recipient: otherUserId },
      { sender: otherUserId, recipient: req.user._id }
    ]
  })
    .sort('createdAt')
    .populate('sender', 'name photo')
    .populate('recipient', 'name photo');

  await Message.updateMany(
    { sender: otherUserId, recipient: req.user._id, readAt: null },
    { readAt: new Date() }
  );

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: { messages }
  });
});

exports.getInbox = catchAsync(async (req, res, next) => {
  const messages = await Message.find({
    $or: [{ sender: req.user._id }, { recipient: req.user._id }]
  })
    .sort('-createdAt')
    .limit(50)
    .populate('sender', 'name photo')
    .populate('recipient', 'name photo')
    .populate('booking', 'experience')
    .populate('experience', 'title');

  const threads = new Map();
  messages.forEach(msg => {
    const otherId =
      String(msg.sender._id) === String(req.user._id)
        ? String(msg.recipient._id)
        : String(msg.sender._id);
    if (!threads.has(otherId)) {
      threads.set(otherId, {
        user:
          String(msg.sender._id) === String(req.user._id)
            ? msg.recipient
            : msg.sender,
        lastMessage: msg,
        unread:
          String(msg.recipient._id) === String(req.user._id) && !msg.readAt
      });
    }
  });

  res.status(200).json({
    status: 'success',
    data: { threads: Array.from(threads.values()) }
  });
});
