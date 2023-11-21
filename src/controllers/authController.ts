import { Request, Response } from "express";
import { IUser } from '../types/user/IUser';
import { User } from "../models/User";
import { authConvert } from "../utils/convert/auth";
import { IResponse } from "../types/share/IResponse";
import { registerSchema } from '../utils/validations/auth/authRegister'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
import * as yup from 'yup';

export async function registerUser(req: Request, res: Response<IResponse>) {

    try {
        const validatedData = await registerSchema.validate(req.body, { abortEarly: false });
        // await registerSchema.validate(req.body, { abortEarly: false });
        const findUser: IUser | null = await User.findOne(
            {
                where: { fullname: req.body.fullname }
            }
        );
        const findAdmin: IUser | null = req.body.role == "admin" ? await User.findOne(
            {
                where: { role: 'admin' }
            }
        ) : null
        if (findUser || findAdmin) {
            return res.status(404).json({ success: false, message: "There is already an account" })

        }
        const passwordHash: string = await bcrypt.hash(req.body.password, 10);
        const saveUser: IUser = await User.create({ ...req.body, password: passwordHash });
        const { accessToken } = generateTokens(saveUser);

        return res.status(200).json({ success: true, data: authConvert(saveUser, accessToken), message: 'User created successfully' });
    } catch (error: any) {
        console.log("Error", error);
        if (error instanceof yup.ValidationError) {
            // Handle yup validation errors
            return res.status(400).json({ success: false, errors: error.errors, message: 'Invalid input data' });
        }
        return res.status(404).json({ success: false, message: "Internal Server Error" })
    }
}


export async function loginUser(req: Request, res: Response<IResponse>) {
    const { fullname, password } = req.body;
    try {
        const findUser: IUser | null = await User.findOne(
            {
                where: { fullname: fullname }
            }
        );
        if (!findUser) {
            return res.status(404).json({ success: false, message: "The fullname or password is incorrect" })

        }

        const passwordMatch: boolean = await bcrypt.compare(password, findUser?.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "The full name or password is incorrect" });
        }
        const { accessToken } = generateTokens(findUser);

        return res.status(200).json({ success: true, data: authConvert(findUser, accessToken), message: 'User login successfully' });

    } catch (error: any) {
        console.log(error);

        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}



export async function loginAdmin(req: Request, res: Response<IResponse>) {
    const { fullname, password } = req.body;
    try {
        const findUser: IUser | null = await User.findOne(
            {
                where: { fullname: fullname }
            }
        );
        if (!findUser) {
            return res.status(404).json({ success: false, message: "Admin not found" })

        }

        const passwordMatch: boolean = await bcrypt.compare(password, findUser?.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
        const { accessToken } = generateTokens(findUser);

        return res.status(200).json({ success: true, data: authConvert(findUser, accessToken), message: 'Admin login successfully' });

    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

const generateTokens = (user: IUser): { accessToken: string } => {
    const accessToken = jwt.sign(
        { userId: user.id, fullname: user.fullname, role: user.role },
        process.env.ACCESS_TOKEN,
    );



    return { accessToken: `Bearer ${accessToken}` };
};