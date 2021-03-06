import { createUser, findUser } from "../../backend/database";
import { v2 as cloudinary } from "cloudinary";
import { isValidName, ValidateError, isValidEmail, isValidPassword, hashPassword } from "../../components/validation";

cloudinary.config({ 
    cloud_name: "deslpxwpx", 
    api_key: "156744827962388", 
    api_secret: "dmtCHsRjcktnh_IE1bRMcRZrOgY" 
});

export default async function handler(req, res) {
    if (req.method == "POST") {
        const data = req.body;
        const {username, email, password} = data;
        var { image } = data;
        
        var image_url = cloudinary.uploader.upload(image, function(error, result) {});
        image = (await image_url).url

        console.log("nametest: ", username)
        console.log("emailtest: ", email)
        console.log("passwdtest: ", password)
        console.log("imagetest: ", image)

        // check if user already exist
        const user = await findUser(email);
        if(user) {
            res.status(422).json({ message: "User already exists" });
            return;
        }

        if(!isValidName(username) && username.length < 25 && username.length >= 0) {
            throw ValidateError("username", "username is required. maxlength 25")
        }
        if(!isValidEmail(email) && email.length < 50 && email.length >= 0) {
            throw ValidateError("email", "email is required. valid email maxlength 50")
        }
        if(!isValidPassword(password) && password.length < 16 && password.length >= 0) {
            throw ValidateError("password", "password is required. minleng=6, maxleng=16, alphabet, number, special charactor")
        }
        await createUser(username, email, image, password);

        res.status(200).json(
            {
                success : true
            }
        );
        return;
    }
    res.status(200).json(data);
}