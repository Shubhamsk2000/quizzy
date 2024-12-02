const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const { submitResult, getParticipantResults } = require('../controllers/resultController');

const router = express.Router();

router.post('/', verifyToken, authorizeRoles('Participant', 'Admin'), submitResult); // Submit Result
router.get('/', verifyToken, authorizeRoles('Participant'), getParticipantResults); // Get Participant Results

module.exports = router;
