import { IAuth } from "./IAuth";

export interface IAuthResponse {
    success: boolean;
    message?: string;
    data?: IAuth;
}