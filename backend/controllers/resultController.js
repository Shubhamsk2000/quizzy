const Result = require('../models/Result');
const Quiz = require('../models/Quiz');

exports.submitResult = async (req, res) => {
    const { quizId, answers } = req.body;

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        let correctAnswers = 0;

        quiz?.questions?.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) correctAnswers++;
        });

        const result = new Result({
            participant: req.user.id,
            quizId: quizId,
            score: (correctAnswers / quiz.questions.length) * 100,
            totalQuestions: quiz.questions.length,
            correctAnswers,
        });

        await result.save();
        res.status(201).json({ message: 'Result submitted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getParticipantResults = async (req, res) => {
    try {
        const results = await Result.find({ participant: req.user.id }).populate('quiz', 'title');
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
