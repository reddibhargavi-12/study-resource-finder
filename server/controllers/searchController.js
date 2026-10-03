import { generateStudyResources } from '../services/geminiService.js';
import SearchLog, { inMemorySearchLogs } from '../models/SearchLog.js';
import mongoose from 'mongoose';

/**
 * @desc Search for study resources for an academic topic
 * @route GET /api/search?q=<topic>
 * @access Public
 */
export const searchTopic = async (req, res, next) => {
  try {
    // Extract query parameter q or body topic
    const topic = req.query.q || req.body?.topic;

    // FR-04 & FR-09: Validate non-empty query
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a topic to search.',
        message: 'Please enter a topic to search.'
      });
    }

    // Input length sanity limit (NFR 9.2)
    if (topic.trim().length > 300) {
      return res.status(400).json({
        success: false,
        error: 'Search topic must be under 300 characters.',
        message: 'Search topic must be under 300 characters.'
      });
    }

    const trimmedTopic = topic.trim();

    // Call AI Generation Service (Gemini API or intelligent synthesizer)
    const studyResources = await generateStudyResources(trimmedTopic);

    // Asynchronously log search activity (non-blocking)
    try {
      if (mongoose.connection.readyState === 1) {
        await SearchLog.create({
          topic: studyResources.topic,
          difficulty: studyResources.difficulty
        });
      } else {
        inMemorySearchLogs.unshift({
          topic: studyResources.topic,
          difficulty: studyResources.difficulty,
          createdAt: new Date()
        });
        if (inMemorySearchLogs.length > 50) inMemorySearchLogs.pop();
      }
    } catch (logErr) {
      // Non-fatal logging error
      console.warn('Logging skipped:', logErr.message);
    }

    // Return exact schema as defined in SRS Section 6.4 and Table 15
    return res.status(200).json({
      success: true,
      data: studyResources,
      // Also provide fields at top level for exact match with SRS Table 15
      topic: studyResources.topic,
      difficulty: studyResources.difficulty,
      summary: studyResources.summary,
      keyConcepts: studyResources.keyConcepts,
      importantPoints: studyResources.importantPoints,
      example: studyResources.example,
      practiceQuestions: studyResources.practiceQuestions,
      relatedTopics: studyResources.relatedTopics,
      learningPath: studyResources.learningPath
    });
  } catch (error) {
    console.error('Error during search processing:', error);
    return next(error);
  }
};

/**
 * @desc Get global recent searches/popular searches
 * @route GET /api/search/popular
 * @access Public
 */
export const getPopularTopics = async (req, res) => {
  const curatedPopular = [
    'Python Inheritance',
    'DBMS Normalization',
    'Photosynthesis',
    'Binary Search Trees',
    'Quantum Computing',
    'React Hooks & State'
  ];
  return res.status(200).json({
    success: true,
    data: curatedPopular
  });
};
