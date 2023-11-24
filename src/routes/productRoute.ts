import { Router } from "express";
import express from 'express';
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";
import { getAllProducts, saveProduct } from "../controllers/productController";


const productRouter: Router = express.Router();
const main: string = "/products"
productRouter.get(`${main}/all`, getAllProducts);
productRouter.post(`${main}/save`, authMiddleware, isAdmin, saveProduct);


export default productRouter;