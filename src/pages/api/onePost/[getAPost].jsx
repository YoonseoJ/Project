import { getOneScarf } from "../../../backend/database";

export default async function handler(req, res) {
    const { getAPost } = req.query
    // console.log("test:", getAPost)
    try {
        if (req.method == 'GET') {
            const data = await getOneScarf(getAPost);
            // console.log("here: ", data)
            res.status(200).json(data);
            return;
        }
    } catch {
        res.status(404).send({ error: "Unable to find a post" });
    }
}