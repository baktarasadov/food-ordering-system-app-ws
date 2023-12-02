
import * as Yup from 'yup';

export const orderSchema = Yup.object().shape({
    customer: Yup.string().required(),
    address: Yup.string().required(),
    total: Yup.number().required(),
    status: Yup.number(),
    method: Yup.number(),
});