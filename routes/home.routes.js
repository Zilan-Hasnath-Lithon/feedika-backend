import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { User, FeedMaker } from '../models/index.model.js';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const token = req.cookies?.token;
        let user = null;

        if (token) {
            try {
                const decoded = jsonwebtoken.verify(token, process.env.SECRETid);
                user = await User.findById(decoded.id);
            } catch (err) {
                user = null;
            }
        }

        let query = {};
        if (user) {
            // Logged-in: filter by interests
            query = { category: { $in: user.interests } };
        }

        // Fetch feeds for all social media platforms
        const feeds = await FeedMaker.find(query).lean();

        res.status(200).json(feeds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
