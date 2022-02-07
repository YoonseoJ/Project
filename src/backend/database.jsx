import mongoose from "mongoose";
import Desserts from "./models/Desserts";
import User from "./models/User";

const uri = process.env.DATABASE_URL;

// get all items
export async function getDesserts() {
    const client = await mongoose.connect(uri);
    const desserts = await Desserts.find();
    return desserts;
};

// get specific item with item id
export async function getOneDessert(dessertID) {
    const client = await mongoose.connect(uri);
    const post = await Desserts.findById(dessertID);
    return post
}

// create item and add to database and user item list
export async function createDessert(name, amount, price, ingredients, image, userID) {
    const client = await mongoose.connect(uri);
    const dessert = new Desserts(
        {
            name,
            amount, 
            price,
            ingredients,
            image,
            user: userID
        }
    );
    await dessert.save();

    // add to user item list
    const user = await User.findById(userID);
    user.desserts.push(dessert);
    await user.save();
    return 
};

// get items from user item list with user id
// items that are created by the user
export async function getDessertsByUserID(userID) {
    const client = await mongoose.connect(uri);
    const desserts = await Desserts.find({user: userID}).exec();
    return desserts;
}

// user all users
export async function getUsers() {
    const client = await mongoose.connect(uri);
    const users = await User.find();
    return users;
};

// create user
export async function createUser(name, email, image, password) {
    const client = await mongoose.connect(uri);
    const user = new User(
        {
            name,
            email,
            image,
            password
        }
    );
    return user.save();
};

// check if user exist in the database, if not create user
export async function checkUser(newUser) {
    const client = await mongoose.connect(uri);
    let user = await User.findOne({email: newUser.email}).exec();
    if (!user) {
        user = await createUser(newUser.name, newUser.email, newUser.image, newUser.password);
    }
    return user;
};

// find user with user email
export async function findUser(useremail) {
    const client = await mongoose.connect(uri);
    let user = await User.findOne({email: useremail}).exec();
    return user;
};