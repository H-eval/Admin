 import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    phone: String,
    userId: String,
    password: String,
    languages: [String],
    education: String,
    gender: String,
    age: Number,
    registrationDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
