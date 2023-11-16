const yup = require('yup');

export const registerSchema = yup.object({
    fullname: yup.string().required().min(3).max(50),
    password: yup.string().required().min(8).max(20),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    email: yup.string().email().required(),
});
