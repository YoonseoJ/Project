import { createScarf, getScarves } from '../../backend/database';
import { v2 as cloudinary } from 'cloudinary';

// var cloudinary = import('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'deslpxwpx', 
    api_key: '156744827962388', 
    api_secret: 'dmtCHsRjcktnh_IE1bRMcRZrOgY' 
});

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const data = req.body;
        for (let i = 0; i < data.length; i++) {
            const { name, witch, material, length, width, weight, price, location, description, userID } = data[i]; // destructuring
            var { image } = data[i];

            var image_url = cloudinary.uploader.upload(image, function(error, result) {console.log(result, error)});
            image = (await image_url).url

        await createScarf(name, witch, material, length, width, weight, price, location, description, image, userID);
        }
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