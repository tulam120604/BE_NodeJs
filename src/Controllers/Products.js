import Products from "../Models/Products";
import {StatusCodes} from 'http-status-codes';
import { validateProducts } from "../Validate/Products";

export const getAllProducts = async (req, res) => {
    try {
        const data = await Products.find();
        if (!data.length) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Khong tim thay san pham nao !"
            })
        };
        return res.status(StatusCodes.OK).json({
            message: "Done",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
};


export const getDeitalProduct = async (req, res) => {
    try {
        const data = await Products.findById(req.params.id);
        return res.status(StatusCodes.OK).json({
            message: "Done",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}

export const createProduct = async (req, res) => {
    try {
        const {name,image , price, title, des, countStocks} = req.body;
        const {error} = validateProducts.validate(req.body, {abortEarly: false});
        if (error) {
            const message = error.details.map(e => e.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message
            })
        };
        const data = await Products.create(req.body);
        return res.status(StatusCodes.OK).json({
            message: "Done",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}

export const removeProduct = async (req, res) => {
    try {
        const data = await Products.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.OK).json({
            message: "Done",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}

export const editProduct = async (req, res) => {
    try {
        const {name,image, price, title, des, countStocks} = req.body;
        const {error} = validateProducts.validate(req.body, {abortEarly: false});
        if (error) {
            const message = error.details.map(e => e.message);
            return res.status(StatusCodes.BAD_REQUEST).json({
                message
            })
        };
        const data = await Products.findByIdAndUpdate(req.params.id, req.body, {new : true});
        return res.status(StatusCodes.OK).json({
            message:"Done",
            data
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}