import mongoose from 'mongoose'

const generationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompt: String,
  genre: String,
  mood: String,
  status: {
    type: String,
    enum: ['queued', 'processing', 'completed', 'failed'],
    default: 'queued'
  },
  progress: {
    type: Number,
    default: 0
  },
  result: {
    audioUrl: String,
    duration: String,
    title: String
  },
  externalJobId: String,
  apiProvider: {
    type: String,
    enum: ['suno', 'stability'],
    default: 'suno'
  },
  error: String,
  startedAt: Date,
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Generation', generationSchema)
