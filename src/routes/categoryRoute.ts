import { Router } from "express";
import express from 'express';
import { deleteCategory, getAllCategories, saveCategory } from "../controllers/categoryController";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware";

const categoryRouter: Router = express.Router();
const main: string = "/categories";
categoryRouter.post(`${main}/save`, authMiddleware, isAdmin, saveCategory);
categoryRouter.delete(`${main}/delete/:id`, authMiddleware, isAdmin, deleteCategory);
categoryRouter.get(`${main}/all`, getAllCategories);



export default categoryRouter;