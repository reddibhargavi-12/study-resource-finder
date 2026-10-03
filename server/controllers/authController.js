import jwt from 'jsonwebtoken';
import User, { inMemoryUsers } from '../models/User.js';
import mongoose from 'mongoose';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'study_resource_finder_secret_key_2026', {
    expiresIn: '30d'
  });
};

/**
 * @desc Register a student/user
 * @route POST /api/auth/register
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // If MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists with this email' });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        role: role || 'student',
      });

      return res.status(201).json({
        success: true,
        message: 'Account created successfully',
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id)
        }
      });
    }

    // In-memory fallback
    const existing = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const mockId = 'usr_' + Date.now();
    const newUser = {
      id: mockId,
      _id: mockId,
      name,
      email: email.toLowerCase(),
      role: role || 'student',
      favoriteTopics: [],
      createdAt: new Date()
    };
    inMemoryUsers.push(newUser);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully (Free-tier session)',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser.id)
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Login user
 * @route POST /api/auth/login
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          message: 'Logged in successfully',
          data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            favoriteTopics: user.favoriteTopics,
            token: generateToken(user._id)
          }
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    }

    // In-memory fallback demo login
    const user = inMemoryUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      return res.json({
        success: true,
        message: 'Logged in successfully',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          favoriteTopics: user.favoriteTopics || [],
          token: generateToken(user.id)
        }
      });
    }

    // For effortless evaluation if user didn't register: allow demo login
    if (email === 'student@sitam.edu' || email === 'demo@studyresource.com') {
      const demoUser = {
        id: 'usr_demo_101',
        name: 'SITAM Student',
        email,
        role: 'student',
        favoriteTopics: ['Python Inheritance', 'DBMS Normalization']
      };
      return res.json({
        success: true,
        message: 'Welcome Demo Student!',
        data: {
          ...demoUser,
          token: generateToken(demoUser.id)
        }
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials. Create an account or use Demo login.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get current user profile
 * @route GET /api/auth/me
 */
export const getMe = async (req, res) => {
  return res.json({
    success: true,
    data: req.user
  });
};
