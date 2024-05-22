import Joi from 'joi';

export const Sign_Up = Joi.object ({
    name : Joi.string().min(3).max(30).required().trim().messages({
        'any.required': 'name la bat buoc',
        'string.trim': 'ten khong duoc chua khoang cach',
        'string.empty': 'ten khong duoc de trong',
        'string.min': 'ten it nhat phai chua {#limit} ki tu',
        'string.max': 'ten toi da chi duoc {#limit} ki tu'
    }),
    email : Joi.string().email().trim().required().messages({
        'any.required' : 'email la bat buoc',
        'string.email': 'email khong dung dinh dang',
        'string.trim': 'email khong duoc de khoang cach',
        'string.empty': 'email khong duoc de trong',
    }),
    password: Joi.string().min(6).trim().required().messages({
        'any.required': 'mat khau la bat buoc',
        'string.min': 'mat khau it nhat {#limit} ki tu',
        'string.trim': 'mat khau khong duoc de khoang cach',
        'string.empty': 'mat khau khong duoc de trong'
    })
})



export const Sign_In = Joi.object ({
    email : Joi.string().email().trim().required().messages({
        'any.required' : 'email la bat buoc',
        'string.email': 'email khong dung dinh dang',
        'string.trim': 'email khong duoc de khoang cach',
        'string.empty': 'email khong duoc de trong',
    }),
    password: Joi.string().min(6).trim().required().messages({
        'any.required': 'mat khau la bat buoc',
        'string.min': 'mat khau it nhat {#limit} ki tu',
        'string.trim': 'mat khau khong duoc de khoang cach',
        'string.max' : 'mat khau toi da la {#limit} ki tu',
        'string.empty': 'mat khau khong duoc de trong'
    })
})