import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { User, FeedMaker } from '../models/index.model.js';

const router = express.Router();

router.post("/instagram", async (req, res) => {
    try {
        let feeds;
        const token = req.cookies?.token;

        if (!token) {
            // Non-logged-in user: get all Instagram feeds
            feeds = await FeedMaker.find({ socialMediaName: "Instagram" }).lean();
        } else {
            let user = null;
            try {
                const decoded = jsonwebtoken.verify(token, process.env.SECRETid);
                user = await User.findById(decoded.id);
            } catch (err) {
                user = null;
            }

            if (!user) {
                // Token invalid or user not found, show all feeds
                feeds = await FeedMaker.find({ socialMediaName: "Instagram" }).lean();
            } else {
                // Logged-in user: filter by interests
                feeds = await FeedMaker.find({
                    socialMediaName: "Instagram",
                    category: { $in: user.interests }
                }).lean();
            }
        }

        res.status(200).json(feeds);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
