import { Router } from "express";
import express from 'express';
import { loginAdmin, loginUser, registerUser } from "../controllers/authController";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";


const authRouter: Router = express.Router();

const main = "/auth";
authRouter.get('/test', authMiddleware, isAdmin, (req: any, res: any) => {
    return res.status(200).json({ mes: "success" });
})
authRouter.post(`${main}/register`, registerUser);
authRouter.post(`${main}/login`, loginUser);
authRouter.post(`${main}/admin/login`, loginAdmin);



export default authRouter