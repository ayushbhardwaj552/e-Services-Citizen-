import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema({
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mlaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    inviterName: {
        type: String,
        required: true
    },
    inviterPhone: {
        type: String,
        required: true
    },
    inviterEmail: {
        type: String,
        required: true
    },
    jobProfile: { // New Field
        type: String,
        required: true
    },
    subject: { // New Field
        type: String,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventTime: {
        type: String,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    mediaFiles: [{
        url: {
            type: String,
            required: true
        },
        fileType: {
            type: String,
            enum: ['image', 'video', 'pdf'],
        }
    }],
    status: {
        type: String,
        enum: ['Sent', 'Seen', 'Accepted', 'Declined', 'Expired'],
        default: 'Sent'
    },
    mlaResponse: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Invitation = mongoose.model('Invitation', invitationSchema);
export default Invitation;