 import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.js"; // ✅ ensure lowercase models folder
// import { protect } from "../middleware/authMiddleware.js"; // optional, if you want JWT protection

const router = express.Router();

// ✅ Add new user
router.post("/add-user", async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      userId,
      password,
      languages,
      education,
      gender,
      age,
    } = req.body;

    // check if user already exists (by email or userId)
    const existingUser = await User.findOne({
      $or: [{ email }, { userId }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      middleName,
      lastName,
      email,
      phone,
      userId,
      password: hashedPassword,
      languages,
      education,
      gender,
      age,
    });

    await newUser.save();

    res.status(201).json({
      message: "✅ User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
