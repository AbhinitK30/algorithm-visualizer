import express from 'express';
import {
  getAllQuizzes,
  getQuizByTopic,
  createQuiz,
  submitQuiz
} from '../controllers/quizController.js';

import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllQuizzes);

// Protected routes - specific routes first
router.post('/submit', protect, submitQuiz);
router.post('/', protect, createQuiz);

// Parameterized routes last
router.get('/:topic', getQuizByTopic);

export default router;
