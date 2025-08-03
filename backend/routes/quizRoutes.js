import express from 'express';
import {
  getAllQuizzes,
  getQuizByTopic,
  createQuiz,
  submitQuiz
} from '../controllers/quizController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Public (optional)
router.get('/', getAllQuizzes);
router.get('/:topic', getQuizByTopic);

// Protected
router.post('/', protect, createQuiz);

router.post('/submit',protect, submitQuiz);

export default router;
