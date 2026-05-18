const express = require('express');
const authController = require('../controllers/authController');
const experienceGuideApplicationController = require('../controllers/experienceGuideApplicationController');

const router = express.Router();

router.get(
  '/open-experiences',
  authController.protect,
  experienceGuideApplicationController.getOpenExperiences
);

router.get(
  '/my-applications',
  authController.protect,
  experienceGuideApplicationController.getMyApplications
);

router.post(
  '/experience/:experienceId/apply',
  authController.protect,
  experienceGuideApplicationController.applyToExperience
);

router.get(
  '/experience/:experienceId/applications',
  authController.protect,
  experienceGuideApplicationController.getApplicationsForExperience
);

router.get(
  '/experience/:experienceId/selectable-guides',
  experienceGuideApplicationController.getSelectableGuides
);

router.patch(
  '/:id/approve',
  authController.protect,
  experienceGuideApplicationController.approveApplication
);

router.patch(
  '/:id/reject',
  authController.protect,
  experienceGuideApplicationController.rejectApplication
);

module.exports = router;
