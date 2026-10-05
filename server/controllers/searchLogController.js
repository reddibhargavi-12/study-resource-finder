import SearchLog, { inMemorySearchLogs } from '../models/SearchLog.js';
import mongoose from 'mongoose';

/**
 * @desc Get all search logs from MongoDB
 * @route GET /api/search/logs
 * @access Public / Admin
 */
export const getAllSearchLogs = async (req, res) => {
  try {
    const { userId, limit = 50 } = req.query;

    if (mongoose.connection.readyState === 1) {
      let filter = {};
      if (userId) filter.userId = userId;

      const logs = await SearchLog.find(filter)
        .populate('userId', 'name email role')
        .sort({ searchedAt: -1 })
        .limit(Number(limit));

      return res.status(200).json({
        success: true,
        count: logs.length,
        source: 'MongoDB Atlas (study-resource-finder-1)',
        data: logs,
      });
    }

    let logs = [...inMemorySearchLogs];
    if (userId) logs = logs.filter(l => l.userId === userId);

    return res.status(200).json({
      success: true,
      count: logs.length,
      source: 'In-Memory Store',
      data: logs.slice(0, Number(limit)),
    });
  } catch (error) {
    console.error('Error fetching search logs:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get search history for the logged-in user
 * @route GET /api/search/logs/me
 * @access Authenticated
 */
export const getMySearchLogs = async (req, res) => {
  try {
    const userId = req.user ? (req.user._id || req.user.id) : null;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    if (mongoose.connection.readyState === 1) {
      const logs = await SearchLog.find({ userId })
        .sort({ searchedAt: -1 })
        .limit(30);

      return res.status(200).json({
        success: true,
        count: logs.length,
        data: logs,
      });
    }

    const logs = inMemorySearchLogs.filter(l => l.userId === userId || l.userId?.toString() === userId?.toString());
    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Create search log record directly
 * @route POST /api/search/logs
 * @access Public / Authenticated
 */
export const createSearchLog = async (req, res) => {
  try {
    const { query, topic, difficulty } = req.body;
    if (!query && !topic) {
      return res.status(400).json({ success: false, message: 'Query is required' });
    }

    const searchQuery = (query || topic).trim();
    const userId = req.user ? (req.user._id || req.user.id) : null;

    if (mongoose.connection.readyState === 1) {
      const log = await SearchLog.create({
        userId,
        query: searchQuery,
        topic: topic || searchQuery,
        difficulty: difficulty || 'Beginner',
        searchedAt: new Date(),
      });

      return res.status(201).json({
        success: true,
        message: 'Search log recorded in MongoDB',
        data: log,
      });
    }

    const mockLog = {
      _id: 'log_' + Date.now(),
      userId,
      query: searchQuery,
      topic: topic || searchQuery,
      difficulty: difficulty || 'Beginner',
      searchedAt: new Date(),
    };
    inMemorySearchLogs.unshift(mockLog);

    return res.status(201).json({
      success: true,
      data: mockLog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Clear search history for logged-in user
 * @route DELETE /api/search/logs/me
 * @access Authenticated
 */
export const clearMySearchLogs = async (req, res) => {
  try {
    const userId = req.user ? (req.user._id || req.user.id) : null;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    if (mongoose.connection.readyState === 1) {
      await SearchLog.deleteMany({ userId });
      return res.status(200).json({ success: true, message: 'Search history cleared from MongoDB' });
    }

    const remaining = inMemorySearchLogs.filter(l => l.userId !== userId);
    inMemorySearchLogs.length = 0;
    inMemorySearchLogs.push(...remaining);

    return res.status(200).json({ success: true, message: 'Search history cleared' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
