import { Request, Response } from "express";
import { User } from '../models/User';
import { IUser } from "../types/user/IUser";
import { IResponse } from "../types/share/IResponse";
import { UniqueConstraintError } from "sequelize";
const bcrypt = require('bcrypt');
export async function getUsers(req: Request, res: Response<IResponse>) {
    try {
        const userList: IUser[] = await User.findAll();
        if (!userList.length) {
            return res.status(404).json({ success: false, message: "Users not found!" });
        }
        return res.status(200).json({ success: true, data: userList, message: "Users found!" });
    } catch (err: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export async function getUser(req: Request, res: Response<IResponse>) {
    const id: string = req.params.id


    try {
        const findUser: IUser | null = await User.findByPk(id);

        if (!findUser || findUser?.role === "admin") {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        return res.status(200).json({ success: true, data: findUser, message: "User found!" });
    } catch (err: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}
export async function updateUser(req: Request, res: Response<IResponse>) {
    const id: string = req.params.id;
    const { password } = req.body;

    try {
        const findUser = await User.findByPk(id);

        if (!findUser || findUser?.role === "admin") {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        if (password !== undefined && password !== null) {
            const passwordHash: string = await bcrypt.hash(password, 10);
            await findUser.update({ password: passwordHash });
            const updatedUser = await User.findByPk(id);
            return res.status(200).json({ success: true, data: updatedUser as User, message: "User updated successfully" });
        }
        await findUser.update({ ...req.body });

        const updatedUser = await User.findByPk(id);
        return res.status(200).json({ success: true, data: updatedUser as User, message: "User updated successfully" });
    } catch (err: any) {
        if (err instanceof UniqueConstraintError) {
            return res.status(404).json({ success: false, message: "The fullname  is incorrect" })
        }
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function deleteUser(req: Request, res: Response<IResponse>) {
    const id: string = req.params.id;

    try {
        const findUser = await User.findByPk(id);
        if (!findUser || findUser?.role === "admin") {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        await findUser.destroy();

        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getAdmin(req: Request, res: Response<IResponse>) {
    const id: string = req.params.id

    try {
        const findUser: IUser | null = await User.findByPk(id);
        if (!findUser) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        return res.status(200).json({ success: true, data: findUser, message: "User found!" });
    } catch (err: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}