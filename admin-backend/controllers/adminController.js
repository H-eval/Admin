 import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import User from "../models/user.js";

 // 🟢 Add new admin (or sub-admin)
export const addAdmin = async (req, res) => {
  try {
    const { name, email, password, isSubAdmin = false } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      isSubAdmin,  
      registrationDate: new Date(),
    });

    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    console.error("Error adding admin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Add new user
export const addUser = async (req, res) => {
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

    const existingUser = await User.findOne({ $or: [{ email }, { userId }] });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

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
      registrationDate: new Date(),
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 Dashboard summary (users + admins)
// 🟢 Dashboard summary (users + admins)
export const getDashboard = async (req, res) => {
  try {
    const users = await User.find(
      {},
      "firstName middleName lastName email languages registrationDate createdAt"
    )
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const admins = await Admin.find(
      {},
      "name email registrationDate isSuperAdmin"
    )
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // ✅ Combine first/middle/last name for frontend display
    users.forEach((u) => {
      u.name = [u.firstName, u.middleName, u.lastName].filter(Boolean).join(" ");
      u.language = Array.isArray(u.languages) ? u.languages[0] : u.languages;
    });

  console.log("📦 Dashboard data preview:", { users, admins });

    const totalUsers = await User.countDocuments();
    const totalAdmins = await Admin.countDocuments();

    res.json({
      totalUsers,
      totalAdmins,
      users,
      admins,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
