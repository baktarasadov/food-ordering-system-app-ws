import { Request, Response } from "express";
import { categorySchema } from "../utils/validations/category/category";
import * as yup from 'yup';
import { ICategory } from "../types/category/ICategory";
import { IResponse } from "../types/share/IResponse";
import { Category } from "../models/Category";

export async function saveCategory(req: Request, res: Response<IResponse<ICategory>>) {

    try {
        const validatedData = await categorySchema.validate(req.body, { abortEarly: false });

        const saveCategory: ICategory = await Category.create({ ...req.body });
        return res.status(200).json({ success: true, data: saveCategory, message: "Category saved successfully" })
    } catch (error: any) {
        console.log("Error", error);
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ success: false, errors: error.errors, message: 'Invalid input data' });
        }
        return res.status(401).json({ success: false, message: "Internal Server Error" })
    }
}

export async function deleteCategory(req: Request, res: Response<IResponse<ICategory>>) {
    const id: string = req.params.id;
    try {

        const findCategory = await Category.findByPk(id);

        if (!findCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }


        await findCategory.destroy();

        return res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error: any) {
        console.log("Error", error);
        return res.status(401).json({ success: false, message: "Internal Server Error" })
    }
}

export async function getAllCategories(req: Request, res: Response<IResponse<ICategory[]>>) {

    try {
        const categories: ICategory[] = await Category.findAll();
        return res.status(200).json({ success: true, message: "Success", data: categories });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}