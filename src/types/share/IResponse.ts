import { IAuth } from '../auth/IAuth';
import { IFooter } from '../footer/IFooter';
import { IUser } from '../user/IUser';
type dataType = IUser | IUser[] | IAuth | IFooter

export interface IResponse {
    success: boolean;
    message?: string;
    data?: dataType
    errors?: String[]
}


