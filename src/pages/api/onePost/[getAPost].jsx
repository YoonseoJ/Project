import { getOneDessert } from "../../../backend/database";

export default async function handler(req, res) {
    const { getAPost } = req.query
    try {
        if (req.method == "GET") {
            const data = await getOneDessert(getAPost);
            res.status(200).json(data);
            return;
        }
    } catch {
        res.status(404).send({ error: "Unable to find a post" });
    }
}