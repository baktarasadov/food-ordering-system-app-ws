const yup = require('yup');

export const footerSaveSchema = yup.object({
    email: yup.string().email().required(),
    phoneNumber: yup.string().required().min(8).max(50),
    location: yup.string().required().min(4).max(20),
    description: yup.string().required().min(8).max(20),
    openingDay: yup.string().required().min(2).max(20),
    openingHour: yup.string().required().min(2).max(20),


});

