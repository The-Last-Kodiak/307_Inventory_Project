import mongoose from "mongoose";
import userModel from "./databaseSchema.js";

mongoose.set("debug", true);

mongoose
    .connect("mongodb://127.0.0.1:27017/databaseSchema", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

function getUsers() {
    const promise = userModel.find();
    return promise;
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

export default {
    getUsers,
    addUser
}