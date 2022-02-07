import { findUser } from "../../backend/database";

export default async function handler(req, res) {
    if (req.method == "POST") {
        const data = req.body;
        const {email} = data;

        // check if user already exist
        const user = await findUser(email);
        if(user == null) {
            res.status(422).json({ message: "User does not exist" });
            return;
        }

        res.status(200).json(user);
        return;
    }
}