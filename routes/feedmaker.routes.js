import express from 'express';
import FeedMakerModel from '../models/feedmaker.model.js';
import Admin from '../models/admin.model.js';
import { tokenCheck } from '../middleware/middleware.js'; // existing middleware that sets req.userId

const router = express.Router();

const adminCheck = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.userId);
        if (!admin) return res.status(403).json({ message: "Access denied. Admins only." });
        next();
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

router.post('/', tokenCheck, adminCheck, async (req, res) => {
    try {
        const { title, socialMediaName, link, category, forAgeGroup } = req.body;

        const feed = new FeedMakerModel({
            title,
            socialMediaName,
            link,
            category,
            forAgeGroup
        });

        await feed.save();
        res.status(201).json({ message: "Feed created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
