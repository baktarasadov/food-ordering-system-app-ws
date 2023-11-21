import e, { NextFunction, Request, Response } from "express";
import { IUser } from "../types/user/IUser";
const jwt = require('jsonwebtoken');

interface AuthRequest extends Request {
    user?: IUser;
}
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Invalid token" })

    jwt.verify(token, process.env.ACCESS_TOKEN, (err: any, user: any) => {

        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, message: "Internal Error" })
        }

        req.user = user;
        next();

    })

}

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ success: false, message: 'Unauthorized - Admin access required' });
        }
    } catch (error) {
        console.error('Error checking admin role:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

}
