// import { Request, Response } from "express";
// import { User } from '../models/User';
// import { IUserResponse } from "../types/user/IUserResponse";
// import { IUser } from "../types/user/IUser";

// export async function getUsers(req: Request, res: Response<IUserResponse>) {
//     try {
//         const userList: IUser[] = await User.findAll();
//         if (!userList.length) {
//             return res.status(404).json({ success: false, message: "Users not found!" });
//         }
//         return res.status(200).json({ success: true, data: userList });
//     } catch (err: any) {
//         return res.status(500).json({ success: false, message: "Internal Server Error" });
//     }

// }