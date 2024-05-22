import Joi from 'joi';

export const validateProducts = Joi.object({
    name: Joi.string().trim().required().messages({
        'any.required': 'Ten san pham la bat buoc !',
        'string.empty': 'Ten san pham khong duoc de trong !'
    }),
    image: Joi.string(),
    price: Joi.number().required().min(1).messages({
        'any.required': 'Gia san pham la bat buoc !',
        'number.empty': 'Gia san pham khong duoc de trong !',
        'number.min': ' Gia san pham it nhat la {#limit}'
    }),
    title: Joi.string().min(6).required().messages({
        'any.required': 'Tieu de san pham la bat buoc !',
        'string.empty': "Tieu de san pham khong duoc de trong !",
        'string.min': 'Tieu de san pham it nhat la {#limit} ki tu !'
    }),
    des: Joi.string().min(6).required().messages({
        'any.required': 'Mo ta san pham la bat buoc !',
        'string.empty': "Mo ta san pham khong duoc de trong !",
        'string.min': 'Mo ta san pham it nhat la {#limit}'
    }),
    countStocks : Joi.number().min(1).required().messages({
        'number.any': 'So luong san pham trong kho la bat buoc !',
        'number.empty': 'So luong san pham trong kho khong duoc de trong !',
        'number.min': 'So luong trong kho it nhat la {#limit} san pham !'
    })
})