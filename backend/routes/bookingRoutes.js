const express = require('express');
const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

// 🔹 Initialize Chapa checkout
router.get(
  '/checkout-session/:experienceId',
  authController.protect,
  bookingController.getCheckoutSession
);

// 🔹 Verify Chapa callback
// Support both GET (manual) and POST (payment gateway callbacks) for verification
// Support GET/POST with txRef in URL
router
  .route('/verify/:tx_ref')
  .get(bookingController.verifyPayment)
  .post(bookingController.verifyPayment);
// Support POST callbacks that send tx_ref in the request body (some gateways use this)
router.post('/verify', bookingController.verifyPayment);

// 🔹 Get current user's bookings
router.get('/me', authController.protect, bookingController.getMyBookings);

// 🔹 Get bookings for host's experiences
router.get('/host/bookings', authController.protect, bookingController.getHostBookings);

// 🔹 Guide: assigned bookings and service actions
router.get('/guide/bookings', authController.protect, bookingController.getGuideBookings);
router.patch(
  '/:id/guide/confirm-availability',
  authController.protect,
  bookingController.confirmGuideAvailability
);
router.patch(
  '/:id/guide/complete',
  authController.protect,
  bookingController.completeGuideService
);

// 🔹 Availability for an experience
router.get('/availability/:experienceId', bookingController.getAvailability);

module.exports = router;
