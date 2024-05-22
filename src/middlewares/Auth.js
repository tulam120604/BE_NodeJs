import jwt from 'jsonwebtoken';
import User from '../Models/User';
import {StatusCodes} from 'http-status-codes';

export const checkPremisionAuth = async (req,res, next) => {
    try {
        // lấy token từ headers gửi lên
        const token = req.headers.authorization.split(" ")[1];
        // kiểm tra có token  không :
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Unauthorized !"
            })
        };
        // nếu có token thì verify token
        const user = await jwt.verify(token, '123456', async (error, decoded) => {
            // nếu có lỗi thì trả về lỗi :
            if (error) {
                if (error.name === "TokenExpiredError") {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    error: "Token hết hạn !"
                })
            }
            if (error.name === "JsonWebTokenError") {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    error: "Token không hợp lệ !"
                })
            }
            }
            // nếu không có lỗi thì trả về id user 
            return await User.findOne({_id: decoded.id});
        });
        if (user.role !== 'admin') {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Bạn không có quyền hạn cần thiết !"
            })
        }
        next();
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message
        })
    }
}