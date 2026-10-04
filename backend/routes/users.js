import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { asyncHandler } from '../middleware/errorHandler.js'
import User from '../models/User.js'

const router = express.Router()

// Get user profile
router.get('/me', verifyToken, asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select('-password')
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' })
  }

  res.json({ success: true, data: user })
}))

// Update user profile
router.patch('/me', verifyToken, asyncHandler(async (req, res) => {
  const { firstName, lastName, language, avatar } = req.body
  
  const user = await User.findById(req.userId)
  
  if (firstName) user.firstName = firstName
  if (lastName) user.lastName = lastName
  if (language) user.language = language
  if (avatar) user.avatar = avatar
  
  await user.save()
  
  res.json({
    success: true,
    message: 'Profile updated',
    data: user
  })
}))

// Get user statistics
router.get('/stats', verifyToken, asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId)
  
  res.json({
    success: true,
    data: {
      songsGenerated: user.songsGenerated,
      subscription: user.subscription,
      memberSince: user.createdAt
    }
  })
}))

export default router
