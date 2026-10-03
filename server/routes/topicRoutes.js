import express from 'express';
import { getFavorites, addFavorite, getPlatformStats } from '../controllers/topicController.js';

const router = express.Router();

router.get('/favorites', getFavorites);
router.post('/favorites', addFavorite);
router.get('/stats', getPlatformStats);

export default router;
