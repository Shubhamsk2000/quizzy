const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const {
    createQuiz,
    getAllQuizzes,
    getQuizById,
    deleteQuiz,
} = require('../controllers/quizController');

const router = express.Router();

router.post('/', verifyToken, authorizeRoles('QuizCreator', 'Admin'), createQuiz); // Create Quiz
router.get('/', verifyToken, authorizeRoles('Participant', 'Admin'), getAllQuizzes); // Get All Quizzes
router.get('/:id', verifyToken, authorizeRoles('Admin','Participant', 'QuizCreator'), getQuizById); // Get Quiz By ID
router.delete('/:id', verifyToken, authorizeRoles('QuizCreator', 'Admin'), deleteQuiz); // Delete Quiz

module.exports = router;
