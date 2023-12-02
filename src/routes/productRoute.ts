import { Router } from "express";
import express from 'express';
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";
import { deleteProduct, getAllProducts, getProduct, saveProduct, updateProduct } from "../controllers/productController";


const productRouter: Router = express.Router();
const main: string = "/products"
productRouter.get(`${main}/all`, getAllProducts);
productRouter.get(`${main}/get/:id`, getProduct);

productRouter.post(`${main}/save`, authMiddleware, isAdmin, saveProduct);
productRouter.patch(`${main}/update/:id`, authMiddleware, isAdmin, updateProduct);

productRouter.delete(`${main}/delete/:id`, authMiddleware, isAdmin, deleteProduct);



export default productRouter;