import mongoose from "mongoose";

const dessertSchema = new mongoose.Schema(
    {
        name: String,
        amount: Number,
        price: Number,
        ingredients: String,
        image: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

export default mongoose.models.Desserts || mongoose.model("Desserts", dessertSchema);