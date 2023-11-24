import { Request, Response } from "express";
import { Product } from "../models/Product";
import { IResponse } from "../types/share/IResponse";
import { IProduct } from "../types/product/IProduct";
import * as yup from 'yup';


export async function saveProduct(req: Request, res: Response<IResponse<IProduct>>) {

    try {
        // const validatedData = await categorySchema.validate(req.body, { abortEarly: false });

        const saveProduct: IProduct = await Product.create({ ...req.body });
        return res.status(200).json({ success: true, data: saveProduct, message: "Product saved successfully" })
    } catch (error: any) {
        console.log("Error", error);
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ success: false, errors: error.errors, message: 'Invalid input data' });
        }
        return res.status(401).json({ success: false, message: "Internal Server Error" })
    }
}

export async function getAllProducts(req: Request, res: Response<IResponse<IProduct[]>>) {

    try {
        const products: IProduct[] = await Product.findAll();
        return res.status(200).json({ success: true, message: "Success", data: products });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}