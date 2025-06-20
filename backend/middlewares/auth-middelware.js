const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/user-model");
const { errorHandeler } = require("../utils/error");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(errorHandeler(404, "No token found"));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password")
        next();
    } catch (error) {
        next(errorHandeler(400, "Bad Request"));
    }
};

module.exports = authMiddleware;
