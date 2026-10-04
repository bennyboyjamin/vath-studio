import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import Song from '../models/Song.js'
import Generation from '../models/Generation.js'
import User from '../models/User.js'
import { generateWithSuno } from '../services/sunoService.js'
import { generateWithStability } from '../services/stabilityService.js'

const router = express.Router()

// Generate song
router.post('/generate', verifyToken, asyncHandler(async (req, res) => {
  const { prompt, genre, mood, model } = req.body

  if (!prompt) {
    return res.status(400).json({ success: false, message: 'Prompt is required' })
  }

  // Check user subscription
  const user = await User.findById(req.userId)
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' })
  }

  // Verify generation limit
  if (user.subscription.type === 'free' && user.songsGenerated >= user.subscription.generationsPerMonth) {
    return res.status(402).json({
      success: false,
      message: 'Monthly generation limit reached. Upgrade to Pro.',
      limit: user.subscription.generationsPerMonth
    })
  }

  // Create song record
  const song = new Song({
    userId: req.userId,
    title: `Untitled - ${new Date().toLocaleString()}`,
    prompt,
    genre: genre || 'pop',
    mood: mood || 'happy',
    status: 'pending',
    generationModel: model || 'suno'
  })

  await song.save()

  // Queue generation
  res.status(202).json({
    success: true,
    message: 'Song generation started',
    data: {
      songId: song._id,
      status: song.status,
      progress: song.progress
    }
  })

  // Start async generation
  generateSongAsync(song._id, req.userId, prompt, genre, mood, model)
}))

// Check generation status
router.get('/status/:songId', verifyToken, asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.songId)

  if (!song || song.userId.toString() !== req.userId) {
    return res.status(404).json({ success: false, message: 'Song not found' })
  }

  res.json({
    success: true,
    data: {
      songId: song._id,
      status: song.status,
      progress: song.progress,
      audioUrl: song.audioUrl,
      duration: song.duration,
      error: song.error
    }
  })
}))

// Async generation function
async function generateSongAsync(songId, userId, prompt, genre, mood, model) {
  try {
    const song = await Song.findById(songId)
    song.status = 'generating'
    song.progress = 10
    await song.save()

    let result
    if (model === 'stability') {
      result = await generateWithStability(prompt, genre, mood)
    } else {
      result = await generateWithSuno(prompt, genre, mood)
    }

    song.status = 'completed'
    song.progress = 100
    song.audioUrl = result.audioUrl
    song.duration = result.duration || '3:30'
    song.title = result.title || prompt.substring(0, 50)
    song.generationId = result.generationId
    song.updatedAt = new Date()
    await song.save()

    // Update user stats
    const user = await User.findById(userId)
    user.songsGenerated += 1
    await user.save()

    console.log(`✅ Song ${songId} generated successfully`)
  } catch (error) {
    console.error(`❌ Generation failed for ${songId}:`, error)
    const song = await Song.findById(songId)
    song.status = 'failed'
    song.error = error.message
    await song.save()
  }
}

export default router
