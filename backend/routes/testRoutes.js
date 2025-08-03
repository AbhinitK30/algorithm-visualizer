import express from 'express';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/protected', protect, (req, res) => {
  res.json({
    message: 'Welcome to the protected route!',
    user: req.user
  });
});

export default router;
