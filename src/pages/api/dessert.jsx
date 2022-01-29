import { createDessert, getDesserts } from '../../backend/database';
import { v2 as cloudinary } from 'cloudinary';
import { ValidateError, isValidPositiveFractionNumber } from '../../components/validation';

// var cloudinary = import('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'deslpxwpx', 
    api_key: '156744827962388', 
    api_secret: 'dmtCHsRjcktnh_IE1bRMcRZrOgY' 
});

// step 3, the API
export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = req.body;
        const { name, amount, price, ingredients, userID } = data; // destructuring
        var { image } = data;
        
        var image_url = cloudinary.uploader.upload(image, function(error, result) {});
        // console.log("image--", (await image_url).url, "---end")
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

        console.log("api amount = ", amount);
        // step 4, connect to db & create flamingo
        await createDessert(name, amount, price, ingredients, image, userID);
        res.status(200).json(
            {
                success : true
            }
        );
        return;
    }
    const data = await getDesserts();
    res.status(200).json(data);
}