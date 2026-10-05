import jwt from 'jsonwebtoken';
import User, { inMemoryUsers } from '../models/User.js';
import mongoose from 'mongoose';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'study_resource_finder_secret_key_2026');

      let user = null;
      if (mongoose.connection.readyState === 1) {
        user = await User.findById(decoded.id).select('-password');
      }

      if (!user) {
        user = inMemoryUsers.find(u => u.id === decoded.id || u._id === decoded.id);
      }

      if (!user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

/**
 * Optional Auth: If Bearer token is provided, attach req.user, otherwise continue
 */
export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'study_resource_finder_secret_key_2026');

      let user = null;
      if (mongoose.connection.readyState === 1) {
        user = await User.findById(decoded.id).select('-password');
      }

      if (!user) {
        user = inMemoryUsers.find(u => u.id === decoded.id || u._id === decoded.id);
      }

      if (user) {
        req.user = user;
      }
    } catch (err) {
      // Invalid token in optional auth is non-fatal
      req.user = null;
    }
  }

  next();
};
