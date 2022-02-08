import { createDessert, getDesserts, updateDessert } from "../../backend/database";
import { v2 as cloudinary } from "cloudinary";
import { ValidateError, isValidPositiveFractionNumber } from "../../components/validation";

cloudinary.config({ 
    cloud_name: "deslpxwpx", 
    api_key: "156744827962388", 
    api_secret: "dmtCHsRjcktnh_IE1bRMcRZrOgY" 
});

export default async function handler(req, res) {
    try{
        if (req.method == "POST") {
            const data = req.body;
            const { name, amount, price, ingredients, userID } = data;
            var { image } = data;
            
            var image_url = cloudinary.uploader.upload(image, function(error, result) {});
            image = (await image_url).url
    
            if(name.length > 100 || name == null) {
                throw ValidateError("name", "name is required. name must consist only with alphabets and maxlength of 100");
            }
            if(!isValidPositiveFractionNumber(parseInt(amount)) || amount == null) {
                throw ValidateError("amount", "amount is required. number bewteen 1 to 100");
            }
            if(!isValidPositiveFractionNumber(parseInt(price)) || price == null) {
                throw ValidateError("price", "price is required. number bewteen 1 to 1000");
            }
            if(image == null) {
                throw ValidateError("image", "image is required.");
            }
    
            await createDessert(name, amount, price, ingredients, image, userID);
            res.status(200).json(
                {
                    success : true
                }
            );
            return;
        } 
        else if(req.method == "DELETE") {

        }
        else if(req.method == "PUT") {
            const data = req.body;
            const { dessertID, newDessert } = data;

            await updateDessert(dessertID, newDessert);
            res.status(200).json(
                {
                    success: true
                }
            );
            return;
        }
        else if(req.method == "GET") {
            const data = await getDesserts();
            res.status(200).json(data);
            return;
        }
        
    }   catch {
        res.status(404).send({ error: "Error with post" })
    }
}