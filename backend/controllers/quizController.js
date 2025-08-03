import Quiz from '../models/Quiz.js';
import User from '../models/user.js';

// GET all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET quiz by topic
export const getQuizByTopic = async (req, res) => {
  const { topic } = req.params;
  try {
    const quiz = await Quiz.findOne({ topic });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create new quiz
export const createQuiz = async (req, res) => {
  const { topic, questions } = req.body;
  try {
    const quiz = new Quiz({ topic, questions });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const submitQuiz = async (req, res) => {
  const { topic, answers } = req.body;
  const userId = req.user.id;

  try {
    const quiz = await Quiz.findOne({ topic });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const questions = quiz.questions;
    let score = 0;

    // Calculate score
    questions.forEach((q, i) => {
      if (answers[i] && answers[i] === q.correctAnswer) score++;
    });

    // Save progress to user
    const user = await User.findById(userId);
    user.quizProgress.push({
      topic,
      score,
      total: questions.length
    });

    await user.save();

    res.json({
      message: 'Quiz submitted successfully',
      topic,
      score,
      total: questions.length,
      correctAnswers: questions.map(q => q.correctAnswer)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};