import { IAuth } from '../auth/IAuth';
import { ICategory } from '../category/ICategory';
import { IFooter } from '../footer/IFooter';
import { IUser } from '../user/IUser';
type dataType = IUser | IUser[] | IAuth | IFooter | ICategory | ICategory[]

export interface IResponse {
    success: boolean;
    message?: string;
    data?: dataType
    errors?: String[]
}


