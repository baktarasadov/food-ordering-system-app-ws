import { Request, Response } from "express";
import { Product } from "../models/Product";
import { IResponse } from "../types/share/IResponse";
import { IProduct } from "../types/product/IProduct";
import * as yup from 'yup';
import { Category } from "../models/Category";


export async function saveProduct(req: Request, res: Response<IResponse<IProduct>>) {

    try {

        const saveProduct: IProduct = await Product.create({ ...req.body });
        return res.status(200).json({ success: true, data: saveProduct, message: "Product saved successfully" })
    } catch (error: any) {
        console.log("Error", error);
        return res.status(401).json({ success: false, message: "Internal Server Error" })
    }
}

export async function updateProduct(req: Request, res: Response<IResponse<IProduct>>) {
    const id: string = req.params.id;
    try {
        const findProduct = await Product.findByPk(id);
        if (!findProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        await findProduct.update({ ...req.body });
        const updateFooter: IProduct | null = await Product.findByPk(id);
        return res.status(200).json({ success: true, message: "Product updated", data: updateFooter as Product });
    } catch (error: any) {
        return res.status(401).json({ success: false, message: "Internal Server Error" });
    }
}
export async function deleteProduct(req: Request, res: Response<IResponse<IProduct>>) {

    const id: string = req.params.id;
    try {
        const findProduct = await Product.findByPk(id);
        if (!findProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        await findProduct.destroy();
        return res.status(200).json({ success: true, message: "Product successfully deleted" });

    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export async function getAllProducts(req: Request, res: Response<IResponse<IProduct[]>>) {

    try {
        const products: IProduct[] = await Product.findAll({
            include: {
                model: Category,
                attributes: ['categoryId', 'categoryName',],
            },
        });
        return res.status(200).json({ success: true, message: "Success", data: products });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getProduct(req: Request, res: Response<IResponse<IProduct>>) {

    const id: string = req.params.id;
    try {
        const findProduct = await Product.findByPk(id);
        if (!findProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, message: "Product found", data: findProduct })

    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}