import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        socialMediaName: { type: String, required: true },
        link: { type: String, required: true },
        category: { type: [String], required: true },
        forAgeGroup: { type: [String] }
    },
    { timestamps: true }
);


export default mongoose.models.FeedMakerModel || mongoose.model("FeedMakerModel", feedSchema);
