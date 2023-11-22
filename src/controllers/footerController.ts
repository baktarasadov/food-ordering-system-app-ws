import { Request, Response } from "express";
import { IResponse } from "../types/share/IResponse";
import { footerSaveSchema } from "../utils/validations/footer/footerSave";
import * as yup from 'yup';
import { IFooter } from "../types/footer/IFooter";
import { Footer } from "../models/Footer";

export async function saveFooter(req: Request, res: Response<IResponse>) {
    try {
        const validatedData = await footerSaveSchema.validate(req.body, { abortEarly: false });

        const saveFooter: IFooter = await Footer.create({ ...req.body });
        return res.status(200).json({ success: true, data: saveFooter, message: 'Footer created successfully' });
    } catch (error: any) {
        console.log(error);
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ success: false, errors: error.errors, message: 'Invalid input data' });
        }
        return res.status(401).json({ success: false, message: "Internal Server Error" });

    }

}

export async function updateFooter(req: Request, res: Response<IResponse>) {

    const id: string = req.params.id;
    try {
        const findFooter = await Footer.findByPk(id);
        if (!findFooter) {
            return res.status(404).json({ success: false, message: "Footer not found" });
        }

        await findFooter.update({ ...req.body });
        const updateFooter: IFooter | null = await Footer.findByPk(id);
        return res.status(200).json({ success: true, message: "Footer updated", data: updateFooter as Footer });
    } catch (error: any) {
        return res.status(401).json({ success: false, message: "Internal Server Error" });
    }

}

export async function getFooter(req: Request, res: Response<IResponse>) {

    const id: string = req.params.id;
    try {
        const findFooter: IFooter | null = await Footer.findByPk(id);
        if (!findFooter) {
            return res.status(404).json({ success: false, message: "Footer not found" });
        }

        return res.status(200).json({ success: true, message: "Footer found", data: findFooter });
    } catch (error: any) {
        return res.status(401).json({ success: false, message: "Internal Server Error" });
    }

}