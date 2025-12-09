import express from 'express';
import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import { tokenCheck } from '../middleware/middleware.js';

const router = express.Router();

router.post("/adminlogin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: "User not found" });
        if (admin.password !== password) return res.status(401).json({ message: "Invalid password" });

        const token = jwt.sign({ id: admin._id }, process.env.SECRETid, { expiresIn: '1h' });

        res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
        res.status(200).json({ message: "Admin login successful" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/check", tokenCheck, async (req, res) => {
    try {
        const admin = await Admin.findById(req.userId);
        if (!admin) return res.status(403).json({ message: "Not an admin" });
        res.status(200).json({ message: "Admin verified" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
