import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
    },
    price : {
        type : Number,
        required: true,
        min: 1
    },
    title : {
        type: String,
        minlength: 6,
        required: true
    },
    des : {
        type: String,
        minlength: 6,
        required: true
    },
    countStocks : {
        type: Number,
        min: 1,
        required: true
    }
} , {timestamps: true, versionKey: false});

export default mongoose.model("Products", productSchema)