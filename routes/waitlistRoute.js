const express = require('express');
const waitlistController = require('../controller/waitlistController');

const router = express.Router();

router.post('/join-waitlist', waitlistController.joinWaitlist);

router.get('/ping', waitlistController.ping);

module.exports = router;
