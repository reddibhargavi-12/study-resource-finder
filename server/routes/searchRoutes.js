import express from 'express';
import { searchTopic, getPopularTopics } from '../controllers/searchController.js';

const router = express.Router();

// FR-08: The backend shall expose GET /api/search?q=<topic>
router.get('/', searchTopic);
router.post('/', searchTopic); // Support POST for convenience as well
router.get('/popular', getPopularTopics);

export default router;
