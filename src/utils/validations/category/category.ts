const yup = require('yup');

export const categorySchema = yup.object({
    title: yup.string().required().min(3).max(50),
});
