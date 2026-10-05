import Resource, { inMemoryResources } from '../models/Resource.js';
import mongoose from 'mongoose';

/**
 * @desc Get all resources or search by keyword/subject/tag
 * @route GET /api/resources
 * @access Public
 */
export const getResources = async (req, res) => {
  try {
    const { q, subject, category, resourceType, tag } = req.query;

    if (mongoose.connection.readyState === 1) {
      let filter = {};

      if (q && q.trim()) {
        const queryRegex = new RegExp(q.trim(), 'i');
        filter.$or = [
          { title: queryRegex },
          { description: queryRegex },
          { subject: queryRegex },
          { category: queryRegex },
          { tags: queryRegex },
        ];
      }

      if (subject) filter.subject = new RegExp(subject.trim(), 'i');
      if (category) filter.category = new RegExp(category.trim(), 'i');
      if (resourceType) filter.resourceType = resourceType.trim();
      if (tag) filter.tags = new RegExp(tag.trim(), 'i');

      const resources = await Resource.find(filter)
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        count: resources.length,
        source: 'MongoDB Atlas (study-resource-finder-1)',
        data: resources,
      });
    }

    // In-memory fallback
    let filtered = [...inMemoryResources];
    if (q) {
      const lower = q.toLowerCase();
      filtered = filtered.filter(r =>
        r.title?.toLowerCase().includes(lower) ||
        r.description?.toLowerCase().includes(lower) ||
        r.subject?.toLowerCase().includes(lower) ||
        r.tags?.some(t => t.toLowerCase().includes(lower))
      );
    }

    return res.status(200).json({
      success: true,
      count: filtered.length,
      source: 'In-Memory Store',
      data: filtered,
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Create and save a new study resource to MongoDB
 * @route POST /api/resources
 * @access Public / Authenticated
 */
export const createResource = async (req, res) => {
  try {
    const { title, description, subject, category, resourceType, url, tags } = req.body;

    if (!title || !description || !subject) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and subject.',
      });
    }

    // Process tags into an array if passed as string
    let parsedTags = [];
    if (Array.isArray(tags)) {
      parsedTags = tags.map(t => String(t).trim()).filter(Boolean);
    } else if (typeof tags === 'string') {
      parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    const createdBy = req.user ? (req.user._id || req.user.id) : null;

    if (mongoose.connection.readyState === 1) {
      const resource = await Resource.create({
        title: title.trim(),
        description: description.trim(),
        subject: subject.trim(),
        category: category ? category.trim() : 'Core Curriculum',
        resourceType: resourceType || 'notes',
        url: url ? url.trim() : '',
        tags: parsedTags,
        createdBy,
        createdAt: new Date(),
      });

      console.log(`✅ [MongoDB Atlas] Resource saved: "${resource.title}" (_id: ${resource._id})`);

      return res.status(201).json({
        success: true,
        message: 'Resource saved to MongoDB successfully',
        data: resource,
      });
    }

    // In-memory fallback
    const mockResource = {
      _id: 'res_' + Date.now(),
      id: 'res_' + Date.now(),
      title: title.trim(),
      description: description.trim(),
      subject: subject.trim(),
      category: category || 'Core Curriculum',
      resourceType: resourceType || 'notes',
      url: url || '',
      tags: parsedTags,
      createdBy,
      createdAt: new Date(),
    };
    inMemoryResources.unshift(mockResource);

    return res.status(201).json({
      success: true,
      message: 'Resource saved (In-memory mode)',
      data: mockResource,
    });
  } catch (error) {
    console.error('Error creating resource:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Get single resource by ID
 * @route GET /api/resources/:id
 * @access Public
 */
export const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const resource = await Resource.findById(id).populate('createdBy', 'name email');
      if (!resource) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
      }
      return res.status(200).json({ success: true, data: resource });
    }

    const resource = inMemoryResources.find(r => r._id === id || r.id === id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    return res.status(200).json({ success: true, data: resource });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Delete a resource
 * @route DELETE /api/resources/:id
 * @access Public / Authenticated
 */
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const resource = await Resource.findByIdAndDelete(id);
      if (!resource) {
        return res.status(404).json({ success: false, message: 'Resource not found' });
      }
      return res.status(200).json({ success: true, message: 'Resource deleted from MongoDB' });
    }

    const idx = inMemoryResources.findIndex(r => r._id === id || r.id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    inMemoryResources.splice(idx, 1);
    return res.status(200).json({ success: true, message: 'Resource deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Helper to ensure MongoDB Atlas has default educational resources seeded
 */
export const seedDefaultResources = async () => {
  if (mongoose.connection.readyState !== 1) return;

  try {
    const count = await Resource.countDocuments();
    if (count === 0) {
      console.log('🌱 [MongoDB] Seeding initial study resources to study-resource-finder-1...');
      await Resource.insertMany([
        {
          title: 'Python Object-Oriented Programming & Inheritance',
          description: 'Comprehensive guide covering single, multiple, and multilevel inheritance in Python, method resolution order (MRO), and super() constructor delegation.',
          subject: 'Computer Science',
          category: 'Programming',
          resourceType: 'code',
          url: 'https://docs.python.org/3/tutorial/classes.html#inheritance',
          tags: ['python', 'oop', 'inheritance', 'classes', 'mro'],
          createdAt: new Date(),
        },
        {
          title: 'Database Normalization from 1NF to BCNF',
          description: 'A complete walkthrough of database table decomposition, removing functional dependencies, and preventing insertion, update, and deletion anomalies.',
          subject: 'Database Systems',
          category: 'DBMS',
          resourceType: 'notes',
          url: 'https://en.wikipedia.org/wiki/Database_normalization',
          tags: ['dbms', 'normalization', 'sql', '1nf', '2nf', '3nf', 'bcnf'],
          createdAt: new Date(),
        },
        {
          title: 'Photosynthesis: Light Reactions and Calvin Cycle',
          description: 'In-depth breakdown of chloroplast physiology, photolysis of water in Photosystem II, ATP synthase, and the carbon-fixing Calvin-Benson cycle.',
          subject: 'Biology',
          category: 'Botany & Cell Biology',
          resourceType: 'article',
          url: 'https://www.nature.com/scitable/topicpage/photosynthetic-cells-14025371/',
          tags: ['biology', 'photosynthesis', 'chloroplast', 'calvin-cycle', 'plants'],
          createdAt: new Date(),
        },
        {
          title: 'Binary Search Trees: Traversal, Insertion, and Deletion',
          description: 'Core tree data structure concepts with detailed algorithms for inorder, preorder, postorder traversals and self-balancing tree mechanics.',
          subject: 'Data Structures',
          category: 'Algorithms',
          resourceType: 'code',
          url: 'https://en.wikipedia.org/wiki/Binary_search_tree',
          tags: ['dsa', 'trees', 'binary-search-tree', 'algorithms'],
          createdAt: new Date(),
        },
      ]);
      console.log('✅ [MongoDB] Initial study resources seeded successfully into MongoDB Atlas!');
    }
  } catch (err) {
    console.warn('⚠️ Seeding skipped:', err.message);
  }
};
