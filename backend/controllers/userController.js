import User from '../models/user.js';

export const getUserProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('quizProgress name email');
    res.json(user.quizProgress);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveAlgoSession = async (req, res) => {
  const { topic, lastStep, customInput } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const existing = user.algoSessions.find(a => a.topic === topic);

    if (existing) {
      existing.lastStep = lastStep;
      existing.customInput = customInput;
      existing.savedAt = new Date();
    } else {
      user.algoSessions.push({ topic, lastStep, customInput });
    }

    await user.save();
    res.json({ message: 'Session saved', session: { topic, lastStep, customInput } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAlgoSessions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('algoSessions');
    res.json(user.algoSessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const toggleBookmark = async (req, res) => {
  const { topic } = req.body;

  try {
    const user = await User.findById(req.user.id);
    const index = user.bookmarkedAlgos.indexOf(topic);

    if (index > -1) {
      user.bookmarkedAlgos.splice(index, 1); // remove bookmark
    } else {
      user.bookmarkedAlgos.push(topic); // add bookmark
    }

    await user.save();
    res.json({ message: 'Bookmark updated', bookmarks: user.bookmarkedAlgos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('bookmarkedAlgos');
    res.json(user.bookmarkedAlgos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const progress = user.quizProgress;
    const totalQuizzes = progress.length;
    const totalScore = progress.reduce((sum, q) => sum + q.score, 0);
    const avgScore = totalQuizzes ? (totalScore / totalQuizzes).toFixed(2) : 0;

    const topicMap = {};
    progress.forEach(q => {
      topicMap[q.topic] = (topicMap[q.topic] || 0) + 1;
    });

    const mostAttempted = Object.entries(topicMap).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    res.json({
      totalQuizzes,
      totalScore,
      avgScore,
      mostAttempted
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
