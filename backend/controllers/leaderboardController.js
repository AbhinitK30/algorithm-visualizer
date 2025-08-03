import User from '../models/user.js';

// Get top users ranked by total score
export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find();

    // Calculate total score per user
    const leaderboard = users.map(user => {
      const totalScore = user.quizProgress.reduce((sum, q) => sum + q.score, 0);
      return {
        name: user.name,
        email: user.email,
        totalScore,
        attempts: user.quizProgress.length
      };
    });

    // Sort by score descending
    leaderboard.sort((a, b) => b.totalScore - a.totalScore);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
