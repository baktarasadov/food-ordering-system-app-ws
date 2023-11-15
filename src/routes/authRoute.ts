import { Router } from "express";
import express from 'express';
import { loginUser, registerUser } from "../controllers/authController";


const authRouter: Router = express.Router();

const main = "/auth";
authRouter.post(`${main}/register`, registerUser);
authRouter.post(`${main}/login`, loginUser);


export default authRouter