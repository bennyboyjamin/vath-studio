import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import Song from '../models/Song.js'

const router = express.Router()

// Get user's songs
router.get('/', verifyToken, asyncHandler(async (req, res) => {
  const songs = await Song.find({ userId: req.userId })
    .select('title genre mood duration audioUrl status createdAt')
    .sort({ createdAt: -1 })
    .limit(50)

  res.json({
    success: true,
    count: songs.length,
    data: songs
  })
}))

// Get single song
router.get('/:id', verifyToken, asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id)

  if (!song) {
    return res.status(404).json({ success: false, message: 'Song not found' })
  }

  if (song.userId.toString() !== req.userId) {
    return res.status(403).json({ success: false, message: 'Unauthorized' })
  }

  res.json({ success: true, data: song })
}))

// Update song
router.patch('/:id', verifyToken, asyncHandler(async (req, res) => {
  const { title, isPublic, tags } = req.body

  const song = await Song.findById(req.params.id)
  if (!song || song.userId.toString() !== req.userId) {
    return res.status(403).json({ success: false, message: 'Unauthorized' })
  }

  if (title) song.title = title
  if (isPublic !== undefined) song.isPublic = isPublic
  if (tags) song.tags = tags
  song.updatedAt = new Date()

  await song.save()
  res.json({ success: true, data: song })
}))

// Delete song
router.delete('/:id', verifyToken, asyncHandler(async (req, res) => {
  const song = await Song.findById(req.params.id)

  if (!song) {
    return res.status(404).json({ success: false, message: 'Song not found' })
  }

  if (song.userId.toString() !== req.userId) {
    return res.status(403).json({ success: false, message: 'Unauthorized' })
  }

  await Song.deleteOne({ _id: req.params.id })
  res.json({ success: true, message: 'Song deleted' })
}))

export default router
