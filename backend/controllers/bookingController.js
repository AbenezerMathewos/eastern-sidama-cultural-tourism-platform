const axios = require('axios');
const Experience = require('./../models/experienceModel');
const Booking = require('./../models/bookingModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { increaseAvailableBalance } = require('../services/walletService');
const {
  notifyBookingConfirmed,
  notifyGuideBookingAssigned
} = require('../services/notificationService');

const getSelectableGuideIds = async experience => {
  const ids = new Set(
    (experience.approvedGuides || []).map(id => String(id._id || id))
  );

  const hostId = experience.host._id || experience.host;
  const host = await User.findById(hostId).select('assignedGuide');
  if (host?.assignedGuide) {
    ids.add(String(host.assignedGuide));
  }

  return ids;
};

const validateGuideSelection = async (experience, guideId) => {
  if (!guideId) {
    if (experience.guideRequirement === 'required') {
      throw new AppError(
        'A certified local guide is required for this experience',
        400
      );
    }
    return null;
  }

  const guide = await User.findById(guideId);
  if (!guide || guide.guideStatus !== 'approved') {
    throw new AppError('Please select a valid certified guide', 400);
  }

  const allowedIds = await getSelectableGuideIds(experience);
  if (!allowedIds.has(String(guideId))) {
    throw new AppError(
      'This guide is not approved for this experience',
      400
    );
  }

  return guideId;
};

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1️⃣ Get the experience being booked
  const experience = await Experience.findById(req.params.experienceId);
  if (!experience) {
    return next(new AppError('No experience found with that ID', 404));
  }

  // 2️⃣ Create a unique transaction reference
  const txRef = `mock-etxplore-${Date.now()}`;

  const requestedQtyRaw = Number(req.query.qty) || 1;
  const qty = Math.max(1, Math.floor(requestedQtyRaw));

  // 3️⃣ Enforce availability
  const existing = await Booking.find({ experience: experience._id });
  const bookedSpots = existing.reduce((sum, b) => sum + (b.quantity || 1), 0);
  const maxGuests = Number(experience.maxGuests) || 0;
  const availableSpots = Math.max(0, maxGuests - bookedSpots);

  if (availableSpots <= 0) {
    return next(new AppError('This experience is sold out.', 400));
  }
  if (qty > availableSpots) {
    return next(
      new AppError(
        `Only ${availableSpots} spot(s) left. Please reduce guests.`,
        400
      )
    );
  }

  const totalAmount = Number(experience.price) * qty;

  let selectedGuideId = null;
  try {
    selectedGuideId = await validateGuideSelection(
      experience,
      req.query.guideId
    );
  } catch (err) {
    return next(err);
  }

  // 4️⃣ Create the booking directly
  const booking = await Booking.create({
    experience: experience._id,
    user: req.user._id,
    guide: selectedGuideId || undefined,
    price: totalAmount,
    quantity: qty,
    paid: true,
    txRef: txRef
  });

  // 5️⃣ Credit host wallet
  try {
    // Use ._id to ensure we send the string ID, not the populated object
    const hostId = experience.host._id || experience.host;

    if (hostId && Number.isFinite(totalAmount)) {
      await increaseAvailableBalance(
        hostId, // FIX: Pass strictly the ID
        Math.round(Number(totalAmount) * 100),
        {
          refType: 'Booking',
          refId: txRef || String(booking._id)
        }
      );
      console.log(`✅ Wallet credited for host: ${hostId}`);
    }
  } catch (e) {
    // This will now actually show you the error in your terminal
    console.error('❌ Wallet credit failed:', e.message);
  }

  try {
    const notifications = [
      notifyBookingConfirmed(req.user, booking, experience),
      notifyBookingConfirmed(experience.host, booking, experience)
    ];
    if (selectedGuideId) {
      notifications.push(
        notifyGuideBookingAssigned(selectedGuideId, booking, experience)
      );
    } else {
      const expWithGuides = await Experience.findById(experience._id).select(
        'approvedGuides'
      );
      for (const gid of expWithGuides?.approvedGuides || []) {
        notifications.push(
          notifyGuideBookingAssigned(gid, booking, experience)
        );
      }
    }
    await Promise.all(notifications);
  } catch (e) {
    console.error('Booking notification failed:', e.message);
  }

  res.status(200).json({
    status: 'success',
    mode: 'mock',
    message: 'Booking created successfully (Mock Mode)',
    booking
  });
});

exports.verifyPayment = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success', message: 'Mock mode active' });
});

// --- UPDATED FOR IMAGE VISIBILITY ---
// backend/controllers/bookingController.js

// backend/controllers/bookingController.js

exports.getMyBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      data: bookings
    }
  });
});

exports.getHostBookings = catchAsync(async (req, res, next) => {
  const experiences = await Experience.find({ host: req.user._id });
  const experienceIds = experiences.map(exp => exp._id);
  const bookings = await Booking.find({ experience: { $in: experienceIds } })
    .populate('user', 'name email')
    .populate('experience', 'title price location imageCover'); // Added imageCover here too

  const totalEarnings = bookings.reduce(
    (sum, booking) => sum + (booking.price || 0),
    0
  );
  res.status(200).json({
    status: 'success',
    results: bookings.length,
    totalEarnings,
    data: bookings
  });
});

const guideCanAccessBooking = async (booking, guideUserId) => {
  if (String(booking.guide) === String(guideUserId)) return true;

  const expId = booking.experience?._id || booking.experience;
  if (!expId) return false;

  const exp = await Experience.findById(expId)
    .setOptions({ bypassApprovedFilter: true })
    .select('approvedGuides host');

  if (!exp) return false;

  if (
    (exp.approvedGuides || []).some(id => String(id) === String(guideUserId))
  ) {
    return true;
  }

  const host = await User.findById(exp.host).select('assignedGuide');
  return String(host?.assignedGuide) === String(guideUserId);
};

exports.getGuideBookings = catchAsync(async (req, res, next) => {
  if (req.user.guideStatus !== 'approved' && req.user.role !== 'admin') {
    return next(new AppError('Approved guide access required', 403));
  }

  const guidedExperiences = await Experience.find({
    approvedGuides: req.user._id,
    status: 'approved'
  }).select('_id');

  const experienceIds = guidedExperiences.map(exp => exp._id);

  const bookingFilter =
    experienceIds.length > 0
      ? {
          $or: [
            { guide: req.user._id },
            { experience: { $in: experienceIds } }
          ]
        }
      : { guide: req.user._id };

  const bookings = await Booking.find(bookingFilter).sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: { bookings }
  });
});

exports.confirmGuideAvailability = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  if (!(await guideCanAccessBooking(booking, req.user._id))) {
    return next(new AppError('You are not the guide for this booking', 403));
  }

  if (!booking.guide) {
    booking.guide = req.user._id;
  }

  booking.guideAvailabilityConfirmed = true;
  booking.guideServiceStatus = 'availability_confirmed';
  await booking.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Availability confirmed',
    data: { booking }
  });
});

exports.completeGuideService = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  if (!(await guideCanAccessBooking(booking, req.user._id))) {
    return next(new AppError('You are not the guide for this booking', 403));
  }

  if (!booking.guide) {
    booking.guide = req.user._id;
  }

  booking.guideServiceStatus = 'completed';
  booking.guideCompletedAt = new Date();
  await booking.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    message: 'Guiding service marked as completed',
    data: { booking }
  });
});

exports.getAvailability = catchAsync(async (req, res, next) => {
  const experienceId = req.params.experienceId;
  const exp = await Experience.findById(experienceId).select('maxGuests');
  if (!exp) return next(new AppError('Experience not found', 404));
  const bookings = await Booking.find({ experience: experienceId });
  const booked = bookings.reduce((sum, b) => sum + (b.quantity || 1), 0);
  const available = Math.max(0, (Number(exp.maxGuests) || 0) - booked);
  res.status(200).json({
    status: 'success',
    data: { booked, available, maxGuests: exp.maxGuests }
  });
});
