import User from "../Models/User";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import {Sign_In, Sign_Up} from '../Validate/User';
import {StatusCodes} from 'http-status-codes';

export const Sign_up = async ( req, res) => {
    try {
        const {name , email , password} = req.body
        const {error} = Sign_Up.validate(req.body , {abortEarly: false});
        if (error) {
            const message = error.details.map(e => e.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message
            })
        };
        const checkEmail = await User.findOne({email});
        if (checkEmail){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message:  "email da ton tai"
            })
        };

        const hashedPassword = await bcryptjs.hash(password, 10);
        const role = (await User.countDocuments({}))=== 0 ? 'admin': 'user';
        const user = await User.create({
            ...req.body, 
            password : hashedPassword,
            role
        });
        User.password = undefined
        return res.status(StatusCodes.CREATED).json({
            message: "Dang ki thanh cong",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


export const Sign_in = async (req, res) => {
    try {
        const { email , password} = req.body;
        const { error} = Sign_In.validate(req.body, {abortEarly: false});
        if (error) {
            const message = error.details.map(e => e.message);
             return res.status(StatusCodes.BAD_REQUEST).json({
                message
             })
        };

        const checkUser = await User.findOne({email});
        if (!checkUser) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Khong tim thay email"
            })
        };

        const checkPass = await bcryptjs.compare(password, checkUser.password);
        if (!checkPass) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Sai mat khau"
            })
        };

        // tao token
        const token = jwt.sign({id : checkUser._id}, '123456', {expiresIn: '1h'});
        checkUser.password = undefined;
        return res.status(StatusCodes.ACCEPTED).json({
            message: 'dang nhap thanh cong',
            checkUser,
            token
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}