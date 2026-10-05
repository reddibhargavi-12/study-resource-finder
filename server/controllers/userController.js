import User, { inMemoryUsers } from '../models/User.js';
import mongoose from 'mongoose';

/**
 * @desc Get all registered users from MongoDB
 * @route GET /api/users
 * @access Public / Admin
 */
export const getAllUsers = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const users = await User.find().select('-password').sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: users.length,
        source: 'MongoDB Atlas (study-resource-finder-1)',
        data: users,
      });
    }

    // In-memory fallback
    return res.status(200).json({
      success: true,
      count: inMemoryUsers.length,
      source: 'In-Memory (Free Tier Mode)',
      data: inMemoryUsers.map(u => ({ id: u.id || u._id, name: u.name, email: u.email, role: u.role, createdAt: u.createdAt })),
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get single user by ID
 * @route GET /api/users/:id
 * @access Public
 */
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(id).select('-password');
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      return res.status(200).json({ success: true, data: user });
    }

    const user = inMemoryUsers.find(u => u.id === id || u._id === id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
