import { addDessertInUserCart, checkDessertInUserCart, removeDessertInUserCart } from "../../backend/database";

export default async function handler(req, res) {
    if (req.method == "PUT") {
        const data = req.body;
        const {dessertID, userID} = data;

        const cartdessert = await checkDessertInUserCart(dessertID);

        if(cartdessert > 0) {
            res.status(422).json({ message: "Item already in cart" });
            return;
        }

        await addDessertInUserCart(dessertID, userID);

        res.status(200).json(
            {
                success: true
            }
        );
        return;
    }
    else if (req.method == "DELETE") {
        const data = req.body;
        const {dessertID, userID} = data;

        await removeDessertInUserCart(dessertID, userID);
        res.status(200).json(
            {
                success: true
            }
        );
        return;
    }
}