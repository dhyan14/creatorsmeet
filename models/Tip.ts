import mongoose from 'mongoose';

const tipSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please provide content for the tip'],
    trim: true,
    maxlength: [280, 'Tip cannot be more than 280 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent model recompilation error in development
const Tip = mongoose.models.Tip || mongoose.model('Tip', tipSchema);

export default Tip;
