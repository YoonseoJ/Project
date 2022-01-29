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
            ref: 'User'
        }
    }
);

// use the already existing Cheetah model or create a new model in mongoose named Cheetah
export default mongoose.models.Desserts || mongoose.model('Desserts', dessertSchema);