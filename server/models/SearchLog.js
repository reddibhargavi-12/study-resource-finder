import mongoose from 'mongoose';

const searchLogSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Unspecified'],
    default: 'Beginner',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const inMemorySearchLogs = [];

const SearchLog = mongoose.models.SearchLog || mongoose.model('SearchLog', searchLogSchema);
export default SearchLog;
