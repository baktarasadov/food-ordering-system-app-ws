import { IAuth } from '../auth/IAuth';
import { IUser } from '../user/IUser';
type dataType = IUser | IUser[] | IAuth

export interface IResponse {
    success: boolean;
    message?: string;
    data?: dataType
    errors?: String[]
}


