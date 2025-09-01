import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
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
    countryCode: { type: String, default: "+91" },
    number: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Invalid phone number"],
    },
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["citizen", "mla"],
    default: "citizen",
  },
   resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
    otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  jobProfile: { // New Field
        type: String
    }
}, { timestamps: true });


userSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire time (e.g., 15 minutes)
  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  return resetToken; // Return the unhashed token to be sent via email
};

// --- NEW METHOD TO GENERATE OTP ---
userSchema.methods.getResetPasswordOtp = function() {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash the OTP and set it on the user document
  this.otp = crypto
    .createHash('sha256')
    .update(otp)
    .digest('hex');

  // Set an expiration time for the OTP (e.g., 10 minutes)
  this.otpExpires = Date.now() + 10 * 60 * 1000;

  // Return the plain, unhashed OTP to be sent via email
  return otp;
};

const User = mongoose.model("User", userSchema);
export default User;
