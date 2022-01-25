import mongoose from 'mongoose';
import Scarves from './models/Scarves';
import User from './models/User';

const uri = process.env.DATABASE_URL;

export async function getScarves() {
    // connect to the client
    const client = await mongoose.connect(uri);

    // find is promise
    const scarves = await Scarves.find();

    return scarves;
};

export async function getOneScarf(scarfID) {
    const client = await mongoose.connect(uri);
    const post = await Scarves.findById(scarfID);
    return post
}

// this function creates a cheetah
export async function createScarf(name, witch, material, length, width, weight, price, location, description, image, userID) {
    const client = await mongoose.connect(uri);

    const scarf = new Scarves(
        {
            name,
            witch,
            material,
            length,
            width,
            weight,
            price,
            location,
            description,
            image,
            user: userID
        }
    );
    await scarf.save();

    const user = await User.findById(userID);
    // console.log('user for card: ', userID)
    // console.log('user for card: ', user)
    user.scarves.push(scarf);
    await user.save();

    return 
};

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
    console.log("testing: ", useremail);

    // console.log("testing yes: ", user);
    return user;
};