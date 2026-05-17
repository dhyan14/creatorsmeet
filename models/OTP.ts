import mongoose, { Schema, Document } from 'mongoose';

export interface IOTP extends Document {
    email: string;
    otp: string;
    expiresAt: Date;
    verified: boolean;
    createdAt: Date;
}

const OTPSchema = new Schema<IOTP>(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
        },
        otp: {
            type: String,
            required: true,
            length: 6
        },
        expiresAt: {
            type: Date,
            required: true,
            default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
            index: { expires: 0 } // TTL index - automatically delete expired documents
        },
        verified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Index for faster email lookups
OTPSchema.index({ email: 1, verified: 1 });

export default mongoose.models.OTP || mongoose.model<IOTP>('OTP', OTPSchema);
