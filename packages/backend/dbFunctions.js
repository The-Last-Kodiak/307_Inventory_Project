import mongoose from "mongoose";
import Models from "./databaseSchema.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

// mongoose
//     .connect("mongodb://127.0.0.1:27017/databaseSchema", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .catch((error) => console.log(error));

function getUsers() {
  const promise = Models.User.find();
  return promise;
}

function addUser(user) {
  const userToAdd = new Models.User(user);
  const promise = userToAdd.save();
  return promise;
}

//internal fuction to get a user
function getUser(credentials) {
  let query = {
    username: credentials.username,
    password: credentials.password,
  };

  const search = Models.User.find(query);
  return search;
}

function addProduct(product) {
  const newProduct = new Models.Inventory(product);
  const promise = newProduct.save();
  return promise;
}

function getProducts(user) {
  let promise = Models.Inventory.find(
    { username: user.username },
    { _id: 0, __v: 0, username: 0 },
  );
  return promise;
}

function deleteProduct(product) {
  let p = {
    username: product.username,
    product_name: product.product_name,
    price: product.price,
    quantity: product.quantity,
    supplier: product.supplier,
    description: product.description,
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
};
