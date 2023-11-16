import { IUser } from "./IUser";

export interface IUserResponse {
    success: boolean;
    message?: string;
    data?: IUser[] | IUser;
}



