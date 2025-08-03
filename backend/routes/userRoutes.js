import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  getUserProgress,
  saveAlgoSession,
  getAlgoSessions,
  toggleBookmark,
  getBookmarks,
  getUserAnalytics
} from '../controllers/userController.js';

const router = express.Router();
router.get('/progress', protect, getUserProgress);

router.post('/algo/save', protect, saveAlgoSession);
router.get('/algo/sessions', protect, getAlgoSessions);

router.post('/bookmark', protect, toggleBookmark);
router.get('/bookmarks', protect, getBookmarks);

router.get('/analytics', protect, getUserAnalytics);

export default router;
