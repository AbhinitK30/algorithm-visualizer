import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  questions: [questionSchema]
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);
