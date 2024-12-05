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

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
});

// TODO:
// securely log a user in (FETCH USER) - done
// get a user's catalog (FETCH USER INVENTORY) - done
// link signup with signup page (CREATE NEW USER) - done
// post a new product to a user's catalog (CREATE NEW PRODUCTS) - done
// link the new product form - done
// link the inventory fetch - done
// create a page component so that users can view an individual product's details
// delete a user's product (DELETE USER PRODUCTS)
// log out button on navbar that calls a logout function
// new product schema to include SKU - done
// create database sample data
// home page quick stats
// card view