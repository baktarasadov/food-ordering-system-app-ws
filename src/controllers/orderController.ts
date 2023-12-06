import { Request, Response } from "express";
import { IResponse } from "../types/share/IResponse";
import { IOrder } from '../types/order/IOrder';
import { Order } from "../models/Order";
import { orderSchema } from "../utils/validations/order/order";
import * as yup from 'yup';

export async function saveOrder(req: Request, res: Response<IResponse<IOrder>>) {

    try {
        const validatedData = await orderSchema.validate(req.body, { abortEarly: false });
        const saveOrder: IOrder = await Order.create({ ...req.body });
        return res.status(200).json({ success: true, data: saveOrder, message: "Order saved successfully" })
    } catch (error: any) {
        console.log("Error", error);
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ success: false, errors: error.errors, message: 'Invalid input data' });
        }
        return res.status(401).json({ success: false, message: "Internal Server Error" })
    }
}

export async function updateOrder(req: Request, res: Response<IResponse<IOrder>>) {
    const id: string = req.params.id;
    try {
        const findOrder = await Order.findByPk(id);
        if (!findOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        await findOrder.update({ ...req.body });
        const updateOrder: IOrder | null = await Order.findByPk(id);
        return res.status(200).json({ success: true, message: "Order updated", data: updateOrder as Order });
    } catch (error: any) {
        return res.status(401).json({ success: false, message: "Internal Server Error" });
    }
}
export async function deleteOrder(req: Request, res: Response<IResponse<IOrder>>) {

    const id: string = req.params.id;
    try {
        const findOrder = await Order.findByPk(id);
        if (!findOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        await findOrder.destroy();
        return res.status(200).json({ success: true, message: "Order successfully deleted" });

    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export async function getAllOrders(req: Request, res: Response<IResponse<IOrder[]>>) {

    try {
        const orders: IOrder[] = await Order.findAll({

        });
        return res.status(200).json({ success: true, message: "Success", data: orders });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getOrder(req: Request, res: Response<IResponse<IOrder[]>>) {
    const email: string = req.params.email;

    try {
        const findOrder: IOrder[] | null = await Order.findAll({
            where: { customer: email }
        });

        if (!findOrder || findOrder.length === 0) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ success: true, message: "Order found", data: findOrder });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
