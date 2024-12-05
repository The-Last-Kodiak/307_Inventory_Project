// backend/utils/jwt.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const KEY = process.env.JWT_KEY;

export const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, KEY, {
        expiresIn: "1h",
    });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, KEY);
    } catch {
        return null;
    }
};