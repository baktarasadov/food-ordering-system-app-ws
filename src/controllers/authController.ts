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

        const { accessToken, refreshToken } = generateTokens(saveUser);
        res.status(200).json({ success: true, data: saveUser, message: 'User created successfully', accessToken: accessToken, refreshToken: refreshToken });
    } catch (error: any) {
        res.status(404).json({ success: false, message: "Internal Server Error" })
        console.log("Error", error);


    }


}
export async function loginUser(req: Request, res: Response<IUserResponse>): Promise<void> {
    const { email, password } = req.body;
    const findUser: IUser | null = await User.findOne(
        {
            where: { email: email }
        }
    );
    if (!findUser) {
        res.status(404).json({ success: false, message: "User not found" })

    }

}


const generateTokens = (user: IUser): { accessToken: string, refreshToken: string } => {
    const accessToken = jwt.sign(
        { userId: user.id, fullname: user.fullname },
        process.env.ACCESS_TOKEN,
        { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
        { userId: user.id, fullname: user.fullname },
        process.env.REFRESH_TOKEN,
        { expiresIn: '7d' }
    );

    return { accessToken: `Bearer ${accessToken}`, refreshToken: `Bearer ${refreshToken}` };
};