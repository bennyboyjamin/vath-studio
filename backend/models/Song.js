import mongoose from 'mongoose'

const songSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    enum: ['pop', 'rock', 'hip-hop', 'jazz', 'classical', 'electronic', 'country', 'reggae'],
    default: 'pop'
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'energetic', 'calm', 'melancholic', 'romantic'],
    default: 'happy'
  },
  duration: {
    type: String,
    default: '3:30'
  },
  audioUrl: String,
  waveformData: [Number], // For visualization
  status: {
    type: String,
    enum: ['pending', 'generating', 'completed', 'failed'],
    default: 'pending'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  generationModel: {
    type: String,
    enum: ['suno', 'stability', 'custom'],
    default: 'suno'
  },
  generationId: String, // ID from external API
  error: String,
  downloads: {
    type: Number,
    default: 0
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
})

export default mongoose.model('Song', songSchema)
