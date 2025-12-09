// File: profile.routes.js
import express from "express";
import { User } from "../models/index.model.js";
import { tokenCheck } from "../middleware/middleware.js";

const router = express.Router();

// Get user profile
router.post("/profile", tokenCheck, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Logout route
router.post("/logout", (req, res) => {
    res.clearCookie("token", { path: "/" });
    res.status(200).json({ message: "Logged out successfully" });
});

export default router;
