import { createUser, getUsers } from '../../backend/database';
import { getSession } from "next-auth/client";

// step 3, the API
export default async function handler(req, res) {
    const session = await getSession({req});
    // console.log("session: ", session);
    if (session) {
        if (req.method == 'POST') {
            const user = await getSession({req});
            // console.log("user: ", user.user.image);

            await createUser(user.user.name, user.user.email, user.user.image);
            res.status(200).json(
                {
                    success : true
                }
            );
            return;
        }
        const data = await getUsers();
        res.status(200).json(data);
    } else {
        req.send({
            error: "You need to be signed in.",
        })
    }
}