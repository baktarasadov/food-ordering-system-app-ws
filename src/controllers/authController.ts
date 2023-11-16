import { Request, Response } from "express";
import { IUser } from '../types/user/IUser';
import { User } from "../models/User";
import { IUserResponse } from "../types/user/IUserResponse";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export async function registerUser(req: Request, res: Response<IUserResponse>) {

    try {
        const passwordHash: string = await bcrypt.hash(req.body.password, 10);
        const saveUser: IUser = await User.create({ ...req.body, password: passwordHash });

        const { accessToken } = generateTokens(saveUser);
        return res.status(200).json({ success: true, data: saveUser, message: 'User created successfully', accessToken: accessToken });
    } catch (error: any) {
        console.log("Error", error);
        return res.status(404).json({ success: false, message: "Internal Server Error" })


    }


}
export async function loginUser(req: Request, res: Response<IUserResponse>) {
    const { email, password } = req.body;
    try {
        const findUser: IUser | null = await User.findOne(
            {
                where: { email: email }
            }
        );
        if (!findUser) {
            return res.status(404).json({ success: false, message: "User not found" })

        }

        const passwordMatch: boolean = await bcrypt.compare(password, findUser?.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }
        const { accessToken } = generateTokens(findUser);
        return res.status(200).json({ success: true, data: findUser, message: 'User login successfully', accessToken: accessToken });

    } catch (error: any) {
        console.log(error);

        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export async function loginAdmin(req: Request, res: Response<IUserResponse>) {
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
        return res.status(200).json({ success: true, data: findUser, message: 'Admin login successfully', accessToken: accessToken });

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