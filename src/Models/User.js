import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email : {
        type : String,
        required: true,
        trim: true
    },
    password : {
        type: String,
        minlength: 6,
        required: true,
        trim: true
    },
    role : {
        type: String,
        enum : ['admin', 'user'],
        default: 'user'
    }
}, {timestamps: true, versionKey: false} );

export default mongoose.model("User", userSchema);