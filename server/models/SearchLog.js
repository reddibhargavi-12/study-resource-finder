import mongoose from 'mongoose';

const searchLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  query: {
    type: String,
    required: [true, 'Query is required'],
    trim: true,
  },
  searchedAt: {
    type: Date,
    default: Date.now,
  },
  // Additional helpful fields for platform analytics
  topic: {
    type: String,
    trim: true,
  },
  difficulty: {
    type: String,
    default: 'Beginner',
  }
});

// Index for user history lookups
searchLogSchema.index({ userId: 1, searchedAt: -1 });

export const inMemorySearchLogs = [];

const SearchLog = mongoose.models.SearchLog || mongoose.model('SearchLog', searchLogSchema);
export default SearchLog;
