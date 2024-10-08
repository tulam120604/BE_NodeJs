import mongoose from 'mongoose'

const Notification_Schema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    notification_message: String,
    notes: String,
    link: String,
    status_message: {
        type: Boolean,
        default: false
    },
    user_name: String,
    email: String,
    phone: String,
},
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Notification_Schema", Notification_Schema);