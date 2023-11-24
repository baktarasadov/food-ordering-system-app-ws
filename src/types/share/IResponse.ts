import { IAuth } from '../auth/IAuth';
import { ICategory } from '../category/ICategory';
import { IFooter } from '../footer/IFooter';
import { IProduct } from '../product/IProduct';
import { IUser } from '../user/IUser';

export interface IResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: String[]
}


