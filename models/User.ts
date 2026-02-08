import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string | null;
  name: string;
  role: 'developer' | 'creator' | null;
  emailVerified: Date | null;
  image: string | null;

  // OAuth fields
  googleId?: string;
  githubId?: string;

  // Profile setup tracking
  profileCompleted: boolean;
  setupStep: number; // 1: basic, 2: username, 3: password (OAuth), 4: role, 5: profile
  needsPassword: boolean; // true if OAuth user needs password

  // Matching & Profile fields
  skills: string[]; // e.g., ["React", "Node.js", "Python"]
  interests: string[]; // e.g., ["AI", "Web Development", "Mobile Apps"]
  technologies: string[]; // e.g., ["JavaScript", "MongoDB", "AWS"]
  bio: string;
  availability: 'available' | 'busy' | 'not-available';
  lookingFor: string; // What type of projects/collaborators they're seeking
  experienceLevel: 'beginner' | 'intermediate' | 'expert';

  // Social links
  github: string;
  linkedin: string;
  portfolio: string;

  // OTP fields
  otp?: string;
  otpExpires?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [20, 'Username must not exceed 20 characters'],
      match: [/^[a-z0-9_-]+$/, 'Username can only contain lowercase letters, numbers, underscores, and hyphens'],
      index: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      index: true
    },
    password: {
      type: String,
      default: null,
      minlength: [8, 'Password must be at least 8 characters']
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name must not exceed 100 characters']
    },
    role: {
      type: String,
      enum: ['developer', 'creator', null],
      default: null
    },
    emailVerified: {
      type: Date,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    googleId: {
      type: String,
      sparse: true,
      unique: true
    },
    githubId: {
      type: String,
      sparse: true,
      unique: true
    },
    profileCompleted: {
      type: Boolean,
      default: false
    },
    setupStep: {
      type: Number,
      default: 1,
      min: 1,
      max: 5
    },
    needsPassword: {
      type: Boolean,
      default: false
    },
    skills: {
      type: [String],
      default: []
    },
    interests: {
      type: [String],
      default: []
    },
    technologies: {
      type: [String],
      default: []
    },
    bio: {
      type: String,
      default: '',
      maxlength: [500, 'Bio must not exceed 500 characters']
    },
    availability: {
      type: String,
      enum: ['available', 'busy', 'not-available'],
      default: 'available'
    },
    lookingFor: {
      type: String,
      default: '',
      maxlength: [200, 'Looking for must not exceed 200 characters']
    },
    experienceLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert'],
      default: 'beginner'
    },
    github: {
      type: String,
      default: ''
    },
    linkedin: {
      type: String,
      default: ''
    },
    portfolio: {
      type: String,
      default: ''
    },
    otp: {
      type: String,
      select: false // Don't return by default in queries
    },
    otpExpires: {
      type: Date,
      select: false // Don't return by default in queries
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
