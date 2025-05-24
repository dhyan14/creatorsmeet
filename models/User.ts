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

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['innovator', 'coder'],
    required: true,
  },
  // Fields for coders
  developerStack: {
    type: {
      name: String,
      technologies: [String],
    },
    required: function(this: any) {
      return this.role === 'coder';
    },
  },
  // Fields for innovators
  projectRequirements: {
    type: {
      description: String,
      technologies: [String],
      preferredStack: String,
    },
    required: function(this: any) {
      return this.role === 'innovator';
    },
  },
  matchedWith: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  aiMentor: {
    name: String,
    expertise: [String],
    avatar: String,
    description: String
  },
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
});

// Add indexes for better query performance
userSchema.index({ role: 1 });
userSchema.index({ 'developerStack.technologies': 1 });
userSchema.index({ 'currentProject.tasks.status': 1 });

// Update timestamps on save
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 