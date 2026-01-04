 import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    gender: { type: String },
    age: { type: Number },
    userId: { type: String, unique: true, sparse: true },
    isSuperAdmin: { type: Boolean, default: false },
    registrationDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
