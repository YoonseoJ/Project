import mongoose from 'mongoose';
import Desserts from './models/Desserts';
import User from './models/User';

const uri = process.env.DATABASE_URL;

export async function getDesserts() {
    // connect to the client
    const client = await mongoose.connect(uri);

    // find is promise
    const desserts = await Desserts.find();

    return desserts;
};

export async function getOneDessert(dessertID) {
    const client = await mongoose.connect(uri);
    const post = await Desserts.findById(dessertID);
    return post
}

// this function creates a cheetah
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

    // console.log("amount = ", amount);
    // console.log("test: ", dessert);
    await dessert.save();

    const user = await User.findById(userID);
    // console.log('user for card: ', userID)
    // console.log('user for card: ', user)
    user.desserts.push(dessert);
    await user.save();

    return 
};

export async function getDessertsByUserID(userID) {
    const client = await mongoose.connect(uri);
    const desserts = await Desserts.find({user: userID}).exec();

    return desserts;
}

export async function getUsers() {
    const client = await mongoose.connect(uri);

    const users = await User.find();

    return users;
};

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

export async function checkUser(newUser) {
    const client = await mongoose.connect(uri);

    let user = await User.findOne({email: newUser.email}).exec();
    // console.log("testing: ", newUser.email);
    
    if (!user) {
        user = await createUser(newUser.name, newUser.email, newUser.image, newUser.password);
    }

    // console.log("testing yes: ", user);
    return user;
};

export async function findUser(useremail) {
    const client = await mongoose.connect(uri);

    let user = await User.findOne({email: useremail}).exec();
    // console.log("testing: ", useremail);

    // console.log("testing yes: ", user);
    return user;
};