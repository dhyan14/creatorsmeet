import mongoose, { Schema, Document } from 'mongoose';

export interface IMeeting extends Document {
    title: string;
    description: string;
    projectId: mongoose.Types.ObjectId;
    participants: mongoose.Types.ObjectId[]; // Array of User IDs
    scheduledAt: Date;
    duration: number; // Duration in minutes
    meetingLink: string; // Video call link (Zoom, Google Meet, etc.)
    status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
    notes: string;
    agenda: string;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const MeetingSchema = new Schema<IMeeting>(
    {
        title: {
            type: String,
            required: [true, 'Meeting title is required'],
            trim: true,
            maxlength: [100, 'Title must not exceed 100 characters']
        },
        description: {
            type: String,
            default: '',
            maxlength: [500, 'Description must not exceed 500 characters']
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: 'Project',
            required: [true, 'Project ID is required'],
            index: true
        },
        participants: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        scheduledAt: {
            type: Date,
            required: [true, 'Scheduled time is required'],
            index: true
        },
        duration: {
            type: Number,
            required: [true, 'Duration is required'],
            min: [15, 'Duration must be at least 15 minutes'],
            max: [480, 'Duration must not exceed 8 hours'],
            default: 60
        },
        meetingLink: {
            type: String,
            default: '',
            trim: true
        },
        status: {
            type: String,
            enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
            default: 'scheduled',
            index: true
        },
        notes: {
            type: String,
            default: '',
            maxlength: [2000, 'Notes must not exceed 2000 characters']
        },
        agenda: {
            type: String,
            default: '',
            maxlength: [1000, 'Agenda must not exceed 1000 characters']
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Creator is required'],
            index: true
        }
    },
    {
        timestamps: true
    }
);

// Index for efficient queries
MeetingSchema.index({ scheduledAt: 1, status: 1 });
MeetingSchema.index({ participants: 1, scheduledAt: 1 });

export default mongoose.models.Meeting || mongoose.model<IMeeting>('Meeting', MeetingSchema);
