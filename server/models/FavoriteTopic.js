import mongoose from 'mongoose';

const favoriteTopicSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  }
});

export const inMemoryFavorites = [];

const FavoriteTopic = mongoose.models.FavoriteTopic || mongoose.model('FavoriteTopic', favoriteTopicSchema);
export default FavoriteTopic;
