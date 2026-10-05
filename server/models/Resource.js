import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, 'Please provide a subject'],
    trim: true,
  },
  category: {
    type: String,
    default: 'Core Curriculum',
    trim: true,
  },
  resourceType: {
    type: String,
    enum: ['notes', 'article', 'video', 'code', 'book', 'documentation', 'cheatsheet', 'other'],
    default: 'notes',
    trim: true,
  },
  url: {
    type: String,
    default: '',
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Compound text index for keyword and topic searches
resourceSchema.index({
  title: 'text',
  description: 'text',
  subject: 'text',
  category: 'text',
  tags: 'text'
});

export const inMemoryResources = [];

const Resource = mongoose.models.Resource || mongoose.model('Resource', resourceSchema);
export default Resource;
