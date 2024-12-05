// backend/backend.js
import express from "express";
import db from "./dbFunctions.js";
import cors from "cors";
import dotenv from "dotenv";
import { generateToken } from "./utils/jwt.js";
import { authenticate } from "./utils/authMiddleware.js";

dotenv.config();
const app = express();
const port = 8000;
app.use(express.json());
// whitelist frontend domain
const validOrigins = process.env.VALID_ORIGINS
  ? process.env.VALID_ORIGINS.split(",")
  : [];

// set rules for cors
const corsOptions = {
  // specifies which domains are allowed to access backend
  origin: (origin, callback) => {
    if (validOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Welcome to the SupplyHub API");
});

app.post("/signup", async (req,res) => {
    const { username, password, email } = req.body;

    if(!username || !password || !email) {
        return res.status(400).json({ message: "Please provide all required fields"});
    }

    try{
        const existingUser = await db.Models.User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists"});
        }

        const newUser = { username, password, email };
        await db.addUser(newUser);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.getUser({ username, password });
        if(!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/catalog", authenticate, async (req,res) => {
    try{
        const inventory = await db.getProducts({ username: req.user.username });
        res.status(200).json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error"});
    }
});

app.post("/catalog", authenticate, async (req,res) => {
    const { product_name, price, quantity, supplier, description, sku } = req.body;
    if (!product_name || !price || !quantity || !sku) {
        return res.status(400).json({ message: "Product name, price, quantity, and sku are required" });
    }

    try{
        const product = { product_name, price, quantity, supplier, description, sku, username: req.user.username };
        const newProduct = await db.addProduct(product);
        res.status(201).json({ message: "Product added successfully" , product: newProduct})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add product"});
    }
});

app.delete("/catalog/productId", authenticate, async (req,res) => {
    const { productId } = req.params;

    try{
        const product = await db.Models.Product.findOne({_id: productId, username: req.user.username });
        if(!product) {
            return res.status(404).json({ message: "Product not found or you don't have permission to delete it" });
        }

        await db.Models.Product.deleteOne({_id: productId });
        res.status(200).json({ message: "Product deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete product" });
    }
});

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening");
});

// TODO:
// securely log a user in (FETCH USER) - done
// get a user's catalog (FETCH USER INVENTORY) - done
// link signup with signup page (CREATE NEW USER) - done
// link login with login page - done
// post a new product to a user's catalog (CREATE NEW PRODUCTS) - done
// link the new product form - done
// link the inventory fetch - done
// new product schema to include SKU - done
// delete a user's product (DELETE USER PRODUCTS) - done
// create database sample data - done
// test api locally
// log out button on navbar that calls a logout function
// create a page component so that users can view an individual product's details
// home page quick stats
// flag items
// card view
// add comments to explain methods for future reference
// replace backend with _backend
// test on build