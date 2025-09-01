import mongoose from "mongoose";

const meetingRequestSchema = new mongoose.Schema({
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mlaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  fatherName: {
    type: String,
    required: [true, "Father's name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  alternatePhone: {
    type: String,
  },
  addressLine1: {
    type: String,
    required: [true, "Address Line 1 is required"],
  },
  addressLine2: {
    type: String,
  },
  pradhanName: {
    type: String,
  },
  jobProfile: {
    type: String,
    required: [true, "Job profile or profession is required"],
  },
  purpose: {
    type: String,
    required: [true, "Purpose of the meeting is required"],
  },
  meetingDate: {
    type: Date,
    required: [true, "Please select a date for the meeting"],
  },
  // FIX: Updated schema to correctly handle an array of files
  mediaFiles: [{
    url: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      enum: ['image', 'video', 'pdf'],
    },
  }],
  scheduledMeetingTime: {
    type: Date,
  },
  meetingNotes: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Completed', 'Expired'],
    default: 'Pending',
  },
}, { timestamps: true });

const MeetingRequest = mongoose.model("MeetingRequest", meetingRequestSchema);
export default MeetingRequest;