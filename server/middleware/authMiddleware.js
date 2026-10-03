import jwt from 'jsonwebtoken';
import User, { inMemoryUsers } from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'study_resource_finder_secret_key_2026');

      // Check MongoDB if connected, else in-memory
      let user = null;
      try {
        user = await User.findById(decoded.id).select('-password');
      } catch (err) {
        // Fallback to inMemoryUsers
        user = inMemoryUsers.find(u => u.id === decoded.id || u._id === decoded.id);
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
