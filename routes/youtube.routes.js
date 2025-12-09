import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { User, FeedMaker } from '../models/index.model.js';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let feeds;
        const token = req.cookies?.token;

        if (!token) {
            feeds = await FeedMaker.find({ socialMediaName: "Youtube" }).lean();
        } else {
            let user = null;
            try {
                const decoded = jsonwebtoken.verify(token, process.env.SECRETid);
                user = await User.findById(decoded.id);
            } catch (err) {
                console.warn("Token verification failed", err);
                user = null;
            }

            feeds = await FeedMaker.find({
                socialMediaName: "Youtube",
                category: { $in: user?.interests || [] } // fallback to empty array
            }).lean();
        }

        res.status(200).json(feeds);
    } catch (err) {
        console.error("Error in /youtube route:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
