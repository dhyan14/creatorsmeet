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
    }
  },
  {
    timestamps: true
  }
);

// Create case-insensitive index for username
UserSchema.index({ username: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);