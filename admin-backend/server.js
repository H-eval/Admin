import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import Otp from "./Models/otp.js";
import allowedEmails from "./config/allowedEmails.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ------------------ ROUTES ------------------

// Existing Admin Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Email setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const OTP_EXPIRY = process.env.OTP_EXPIRY_MINUTES || 10;

// Generate random OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// 1️⃣ Request OTP
app.post("/admin/request-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!allowedEmails.includes(email)) {
      return res.status(403).json({ error: "Email not allowed" });
    }

    const otp = generateOtp();
    const otpHash = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY * 60 * 1000);

    await Otp.findOneAndUpdate(
      { email },
      { otpHash, expiresAt, attempts: 0 },
      { upsert: true, new: true }
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Admin Login",
      text: `Your OTP is ${otp}. It will expire in ${OTP_EXPIRY} minutes.`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// 2️⃣ Verify OTP
app.post("/admin/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await Otp.findOne({ email });
    if (!record) return res.status(400).json({ error: "No OTP found" });

    if (new Date() > record.expiresAt)
      return res.status(400).json({ error: "OTP expired" });

    const isMatch = await bcrypt.compare(otp, record.otpHash);
    if (!isMatch) return res.status(400).json({ error: "Invalid OTP" });

    // create token
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    await Otp.deleteOne({ email }); // delete after successful login

    res.json({ message: "Login success", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
