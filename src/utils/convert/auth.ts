import { IAuth } from "../../types/auth/IAuth";
import { IUser } from "../../types/user/IUser";

export const authConvert = (userModel: IUser, token: string): IAuth => {
    const authRes: IAuth = {
        id: userModel.id,
        accessToken: token
    }
    return authRes

}