const Review = require('./../models/reviewModel');
const Experience = require('./../models/experienceModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const { notifyReviewReceived } = require('../services/notificationService');

exports.setExperienceUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.experience) req.body.experience = req.params.experienceId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create(req.body);

  Experience.findById(review.experience).then(experience => {
    if (experience && experience.host) {
      return notifyReviewReceived(experience.host, review, experience);
    }
  }).catch(err => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error creating review notification:', err);
    }
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: review
    }
  });
});
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
