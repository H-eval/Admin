 import express from "express";
import { addAdmin, addUser, getDashboard } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.post("/add-admin", addAdmin);
router.post("/add-user",  addUser);
router.get("/dashboard",  getDashboard);

export default router;
