import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Admin from "../model/Admin.js";
import { createError } from "../middleware/error.js";

export const verifyToken = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, "hai", (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));

        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, async () => {
        const user = await User.findOne({ email: req.user.user.email })
        if (req.user.user.email === user.email || !user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, async () => {
        const admin = await Admin.findOne({ email:req.user.user.email })
        if (req.user.user.isAdmin === admin.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};
