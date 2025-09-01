
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  // Link to the citizen submitting the complaint
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Link to the MLA the complaint is for
  mlaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Details of the person filling the form
  fillerName: {
    type: String,
    required: [true, "Your name is required."],
  },
  fillerPhone: {
    type: String,
    required: [true, "A contact phone number is required."],
  },
  fillerEmail: {
    type: String,
    required: [true, "A contact email is required."],
  },
  fillerAddress: {
    type: String,
    required: [true, "Your residential address is required."],
  },
  // Details about the problem
  tehsil: {
    type: String,
    required: [true, "Tehsil is required."],
  },
  problemLocationAddress: {
    type: String,
    required: [true, "The address of the problem location is required."],
  },
  message: {
    type: String,
    required: [true, "A detailed message describing the problem is required."],
  },
  // For multiple file uploads
  mediaFiles: [{
    url: { type: String, required: true },
    fileType: { type: String, enum: ['image', 'video', 'pdf'], required: true }
  }],
  // To track the complaint's progress
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Resolved', 'Closed'],
    default: 'Submitted',
  },
  
  isRead: {
    type: Boolean,
    default: false,
  },

  // --- NEW FIELD: To store the MLA's response ---
  mlaResponse: {
    type: String,
  },
}, { timestamps: true });

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
