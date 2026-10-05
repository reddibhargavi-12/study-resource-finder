import express from 'express';
import {
  getResources,
  createResource,
  getResourceById,
  deleteResource
} from '../controllers/resourceController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/resources (search & retrieve resources from MongoDB)
router.get('/', getResources);

// POST /api/resources (create resource in MongoDB)
router.post('/', optionalAuth, createResource);

// GET /api/resources/:id
router.get('/:id', getResourceById);

// DELETE /api/resources/:id
router.delete('/:id', optionalAuth, deleteResource);

export default router;
