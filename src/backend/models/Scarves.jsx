import mongoose from "mongoose";

const scarfSchema = new mongoose.Schema(
    {
        name: String,
        witch: String,
        material: String,
        length: Number,
        width: Number,
        weight: Number,
        price: Number,
        location: String,
        description: String,
        image: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

// use the already existing Cheetah model or create a new model in mongoose named Cheetah
export default mongoose.models.Scarves || mongoose.model('Scarves', scarfSchema);