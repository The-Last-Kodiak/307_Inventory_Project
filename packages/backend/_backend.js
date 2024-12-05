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

app.get("/", (req, res) => {
    res.send("Welcome to the SupplyHub API");
});

app.listen(process.env.PORT || port, () => {
    console.log("REST API is listening.");
  });
  