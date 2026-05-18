const express = require('express');
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.use(authController.protect);

router.post('/', messageController.sendMessage);
router.get('/inbox', messageController.getInbox);
router.get('/conversation/:userId', messageController.getConversation);

module.exports = router;
