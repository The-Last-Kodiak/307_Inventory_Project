import mongoose from "mongoose";
import Models from "./databaseSchema.js";
import bcrypt from "bcrypt";

mongoose.set("debug", true);
const SALT_ROUNDS = 10;

mongoose
    .connect("mongodb://127.0.0.1:27017/databaseSchema", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

function getUsers() {
    const promise = Models.User.find();
    return promise;
}

async function addUser(user) {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hashedPassword;
    const userToAdd = new Models.User(user);
    const promise = userToAdd.save();
    return promise;
}


//internal fuction to get a user
async function getUser(credentials) {

    const user = await Models.User.findOne({ username: credentials.username});
    if (!user) {
       return null;
    }


    if (credentials.password == user.password) {
        return user;
    }
    else {
        return null;
    }





}

function addProduct(product) {
    const newProduct = new Models.Inventory(product);
    const promise = newProduct.save();
    return promise;
}

function getProducts(user) {
    let promise = Models.Inventory.find({"username": user.username});
    return promise;
}

function deleteProduct(product) {
    let p = {
        "username": product.username,
        "product_name": product.product_name,
        "price": product.price,
        "quantity": product.quantity,
        "supplier": product.supplier,
        "description": product.description,
    };
    const promise = Models.Inventory.deleteOne(p);
    return promise;
}

export default {
    getUsers,
    getUser,
    addUser,
    addProduct,
    getProducts,
    deleteProduct,
}