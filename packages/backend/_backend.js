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

app.delete("/catalog/:productId", authenticate, async (req,res) => {
    const { productId } = req.params;

    try{
        const product = await db.Models.Inventory.findOne({_id: productId, username: req.user.username });
        if(!product) {
            return res.status(404).json({ message: "Product not found or you don't have permission to delete it" });
        }

        await db.Models.Inventory.deleteOne({_id: productId });
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
// create a page component so that users can view an individual product's details
// home page quick stats
// flag items
// replace backend with _backend
// test on build
// card view
// add comments to explain methods for future reference