const yup = require('yup');

export const categorySchema = yup.object({
    categoryName: yup.string().required().min(3).max(50),
});
