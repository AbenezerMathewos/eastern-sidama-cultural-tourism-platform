const express = require('express');
const experienceController = require('./../controllers/experienceController');
const authController = require('./../controllers/authController');
const uploadMiddleware = require('./../middlewares/uploadMiddleware');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

router.use('/:experienceId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(
    experienceController.aliasTopExperiences,
    experienceController.getAllExperiences
  );

router.route('/experience-stats').get(experienceController.getExperienceStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'host', 'guide'),
    experienceController.getMonthlyPlan
  );

router
  .route('/experiences-within/:distance/center/:latlng/unit/:unit')
  .get(experienceController.getExperiencesWithin);

router
  .route('/distances/:latlng/unit/:unit')
  .get(experienceController.getDistances);

// Admin-only routes for approvals
router
  .route('/pending')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    experienceController.getAllPendingExperiences
  );

router
  .route('/:id/approve')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    experienceController.approveExperience
  );

router
  .route('/:id/reject')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    experienceController.rejectExperience
  );

router
  .route('/upload-image')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'host'),
    uploadMiddleware.uploadExperienceCover,
    uploadMiddleware.handleMulterErrors,
    experienceController.uploadExperienceImage
  );

router
  .route('/')
  .get(authController.protect, experienceController.getAllExperiences)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'host'),
    experienceController.createExperience
  );

router
  .route('/:id')
  .get(experienceController.getExperience)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'host'),
    experienceController.updateExperience
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'host'),
    experienceController.deleteExperience
  );

module.exports = router;
