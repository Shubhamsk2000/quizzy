const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
    const { title, description, questions } = req.body;
    
    try {
        const quiz = new Quiz({
            title,
            description,
            questions,
            createdBy: req.user.id, 
        });

        await quiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('createdBy', 'name email');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getQuizById = async (req, res) => {
    const { id } = req.params;

    try {
        const quiz = await Quiz.findById(id).populate('createdBy', 'name email');
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteQuiz = async (req, res) => {
    const { id } = req.params;

    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        if (quiz.createdBy.toString() !== req.user.id && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        await quiz.remove();
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
