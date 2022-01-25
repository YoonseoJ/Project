import { createScarf, getScarves } from '../../backend/database';
import { v2 as cloudinary } from 'cloudinary';
import { isValidName, ValidateError, isValidPositiveFractionNumber } from '../../components/validation';

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
        const { name, witch, material, length, width, weight, price, location, description, userID } = data; // destructuring
        var { image } = data;
        
        var image_url = cloudinary.uploader.upload(image, function(error, result) {});
        // console.log("image--", (await image_url).url, "---end")
        image = (await image_url).url

        if(!isValidName(name) || name == null) {
            throw ValidateError("name", "name is required. name must consist only with alphabets and maxlength of 25");
        }
        if(!isValidName(witch) || witch == null) {
            throw ValidateError("witch", "witch is required. witch must consist only with alphabets and maxlength of 25");
        }
        if(material == null || material.length > 100) {
            throw ValidateError("material", "material is required. maxlength of 100");
        }
        if(!isValidPositiveFractionNumber(parseInt(length)) || length == null) {
            throw ValidateError("length", "length is required. number bewteen 1 to 450");
        }
        if(!isValidPositiveFractionNumber(parseInt(width)) || width == null) {
            throw ValidateError("width", "width is required. number bewteen 1 to 450");
        }
        if(!isValidPositiveFractionNumber(parseInt(weight)) || weight == null) {
            throw ValidateError("weight", "weight is required. number bewteen 1 to 450");
        }
        if(!isValidPositiveFractionNumber(parseInt(price)) || price == null) {
            throw ValidateError("price", "price is required. number bewteen 1 to 1000");
        }
        if(location == null) {
            throw ValidateError("location", "location is required.");
        }
        if(image == null) {
            throw ValidateError("image", "image is required.");
        }

        // step 4, connect to db & create flamingo
        await createScarf(name, witch, material, length, width, weight, price, location, description, image, userID);
        res.status(200).json(
            {
                success : true
            }
        );
        return;
    }
    const data = await getScarves();
    res.status(200).json(data);
}