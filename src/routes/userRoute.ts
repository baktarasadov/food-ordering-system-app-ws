import express, { Router } from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/userController';
import { authMiddleware, isAdmin } from '../middleware/authMiddleware';

const userRouter: Router = express.Router();
const main: string = '/users'

userRouter.get(`${main}/all`, authMiddleware, isAdmin, getUsers);
userRouter.get(`${main}/get/:id`, authMiddleware, getUser);
userRouter.patch(`${main}/update/:id`, authMiddleware, updateUser);
userRouter.delete(`${main}/delete/:id`, authMiddleware, deleteUser);




export default userRouter;