import { Router } from "express";
import express from 'express';
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";
import { deleteOrder, getAllOrders, getOrder, saveOrder, updateOrder } from "../controllers/orderController";


const orderRouter: Router = express.Router();
const main: string = "/orders"
orderRouter.get(`${main}/all`, authMiddleware, isAdmin, getAllOrders);
orderRouter.get(`${main}/get/:email`, authMiddleware, getOrder);

orderRouter.post(`${main}/save`, saveOrder);
orderRouter.patch(`${main}/update/:id`, authMiddleware, updateOrder);

orderRouter.delete(`${main}/delete/:id`, authMiddleware, deleteOrder);



export default orderRouter;