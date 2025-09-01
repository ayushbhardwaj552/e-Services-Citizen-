import mongoose from "mongoose";

const mlaSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Invalid phone number"],
  },
  constituency: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const MLA = mongoose.model("MLA", mlaSchema);
export default MLA;
