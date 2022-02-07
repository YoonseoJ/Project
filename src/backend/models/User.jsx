import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        image: String,
        password: String,
        desserts: [
            {type: mongoose.Schema.Types.ObjectId, ref: "Dessert"}
        ]
    }
);

export default mongoose.models.User || mongoose.model("User", userSchema);