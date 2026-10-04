import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { asyncHandler } from '../middleware/errorHandler.js'

const router = express.Router()

// Register
router.post('/register', asyncHandler(async (req, res) => {
  const { username, email, password, language } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Missing required fields' })
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] })
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' })
  }

  const user = new User({
    username,
    email,
    password,
    language: language || 'lo'
  })

  await user.save()

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      language: user.language
    }
  })
}))

// Login
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' })
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      language: user.language,
      subscription: user.subscription
    }
  })
}))

export default router
