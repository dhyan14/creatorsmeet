import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'upcoming'],
    default: 'upcoming'
  },
  date: Date,
  description: String
});

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  startDate: Date,
  endDate: Date,
  milestones: [milestoneSchema],
  tasks: [{
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'completed'],
      default: 'todo'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

const performanceSchema = new mongoose.Schema({
  communicationScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  collaborationScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  deliverySpeed: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  codeQuality: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const aiMentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  expertise: [{
    type: String,
    required: true
  }],
  avatar: {
    type: String,
    required: true
  },
  description: String,
  assignedAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  role: {
    type: String,
    enum: ['innovator', 'coder', 'mentor', 'company'],
    required: [true, 'Please specify your role'],
  },
  bio: {
    type: String,
    default: '',
  },
  skills: {
    type: [String],
    default: [],
  },
  country: {
    type: String,
    default: '',
  },
  github: {
    type: String,
    default: '',
  },
  linkedin: {
    type: String,
    default: '',
  },
  profileImage: {
    type: String,
    default: '/default-avatar.png',
  },
  projectRequirements: {
    description: String,
    technologies: [String],
    complexity: String,
    expertise: String,
    preferredStack: String,
    lastAnalyzed: Date,
  },
  matchedWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  aiMentor: aiMentorSchema,
  currentProject: projectSchema,
  performance: performanceSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  activeProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
}, {
  timestamps: true,
});

// Add virtual field for joinedAt
userSchema.virtual('joinedAt').get(function() {
  return this._id.getTimestamp();
});

// Ensure virtuals are included in JSON
userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

// Ensure virtuals are included when using lean()
userSchema.set('toObject', { virtuals: true });

// Add indexes for better query performance
userSchema.index({ role: 1 });
userSchema.index({ 'developerStack.technologies': 1 });
userSchema.index({ 'currentProject.tasks.status': 1 });
userSchema.index({ 'projectRequirements.technologies': 1 });
userSchema.index({ 'projectRequirements.complexity': 1 });
userSchema.index({ 'projectRequirements.expertise': 1 });

// Update timestamps on save
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 