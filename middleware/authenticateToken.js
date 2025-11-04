import jwt from "jsonwebtoken";
import "dotenv/config";
export const authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: "No token, authorization denied" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        err.status = 401;
        err.message = "Token is not valid or expired.";
        next(err);
    };
};