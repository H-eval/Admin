 // const mongoose = require("mongoose");

// const OtpSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   otpHash: { type: String, required: true },
//   expiresAt: { type: Date, required: true },
//   attempts: { type: Number, default: 0 },
// });

// module.exports = mongoose.model("Otp", OtpSchema);

import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
});

const Otp = mongoose.model("Otp", OtpSchema);

export default Otp;

