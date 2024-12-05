//backend/utils.authMiddleware.js
import { verifyToken } from "./jwt.js";

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }

    const decoded = verifyToken(token);
    if(!decoded) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
};