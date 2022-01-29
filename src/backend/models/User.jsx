import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        image: String,
        password: String,
        desserts: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'Dessert'}
        ]
    }
);

// use the already existing Cheetah model or create a new model in mongoose named Cheetah
export default mongoose.models.User || mongoose.model('User', userSchema);