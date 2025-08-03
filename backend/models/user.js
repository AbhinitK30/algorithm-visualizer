import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  quizProgress: [
  {
    topic: String,
    score: Number,
    total: Number,
    attemptedAt: {
      type: Date,
      default: Date.now
      }
    }
  ],
  algoSessions: [
  {
    topic: String,
    lastStep: Number,
    customInput: String,
    savedAt: {
      type: Date,
      default: Date.now
    }
  }
],
bookmarkedAlgos: [String]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
