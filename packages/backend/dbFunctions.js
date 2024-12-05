//backend.dbFunctions.js
import mongoose from "mongoose";
import Models from "./databaseSchema.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
mongoose.set("debug", true);
const SALT_ROUNDS = 10;

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((error) => console.log(error));

mongoose
  .connect("mongodb://127.0.0.1:27017/SupplyHub", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function addUser(user) {
  try{
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    user.password = hashedPassword;
    const userToAdd = new Models.User(user);
    const promise = userToAdd.save();
    return promise;
  } catch (error) {
    console.log("Error adding user to database:", error);
  }
}

//internal fuction to get a user
// res_handling parameter is a lambda function to handle logic after password comparision
async function getUser(credentials, res_handling) {
  const user = await Models.User.findOne({ username: credentials.username});
  if (!user) {
    return null;
  }
  const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

  if(isPasswordValid){
    return user;
  } else {
    return null;
  }
}

async function addProduct(product) {
  const existingProduct = await Models.Inventory.findOne({ sku: product.sku });
  if(existingProduct) {
    throw new Error("Product with this SKU already exists.");
  }
  const newProduct = new Models.Inventory(product);
  const promise = newProduct.save();
  return promise;
}

function updateProduct(product) {
    const promise = Models.Inventory.findOneAndUpdate({
        username: product.username,
        product_name: product.product_name
    }, {
        product_name: product.product_name,
        sku: product.sku,
        price: product.price,
        quantity: product.quantity,
        supplier: product.supplier,
        description: product.description
    });
    return promise;
}

function getProducts(user) {
  let promise = Models.Inventory.find(
    { username: user.username },
    {__v: 0, username: 0 },
  );
  return promise;
}

function getProduct(product){
    let promise = Models.Inventory.find(
        {
            username: product.username,
            product_name: product.product_name
        },
        {__v: 0, username: 0 },
    );
    return promise;
}

export default {
  getUser,
  addUser,
  addProduct,
  updateProduct,
  getProduct,
  getProducts,
  Models,
};
