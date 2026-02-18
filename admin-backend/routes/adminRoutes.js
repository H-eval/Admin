import Admin from "../models/Admin.js";
import { getHomeStats } from "../controllers/adminController.js";

import express from "express";
import { addAdmin, addUser, getDashboard } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.post("/add-admin", addAdmin);
router.post("/add-user",  addUser);
router.get("/dashboard",  getDashboard);
router.get("/home-stats", protect, getHomeStats);

// ✅ Delete subadmin by ID
router.delete("/delete-admin/:id", async (req, res) => {
  try {
    const adminId = req.params.id;

    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ message: "Subadmin not found" });
    }

    res.json({
      message: "Subadmin deleted successfully",
      deletedAdmin,
    });
  } catch (error) {
    console.error("Error deleting subadmin:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
