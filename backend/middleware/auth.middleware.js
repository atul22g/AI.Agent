import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || (req.headers.authorization ? req.headers.authorization.split(' ')[1] : null);

        if (!token) {
            res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
            return res.status(401).json({ error: "Unauthorized User - No token provided" });
        }

        // Check if the token is blacklisted in Redis
        const isBlackListed = await redisClient.get(token);

        if (isBlackListed) {
            res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
            return res.status(401).json({ error: "Unauthorized User - Token blacklisted" });
        }

        // Verify the JWT token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ error: "Token expired, please log in again" });
                }
                return res.status(403).json({ error: "Invalid token" });
            }

            req.user = decoded;
            next();
        });

    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
