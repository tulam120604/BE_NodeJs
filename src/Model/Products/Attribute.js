import mongoose from 'mongoose';

const Schema_Attribute = new mongoose.Schema({
    id_item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    },
    varriants: [
        {
            color_item: {
                type: String,
            },
            size_item: [
                {
                    name_size: String,
                    stock_item: {
                        type: Number,
                        required: true,
                        min: 0,
                        default: 0
                    },
                    price_attribute: {
                        type: Number,
                        default: 0,
                        min: 0
                    },
                    sale_quantity_attr: {
                        type: Number,
                        default: 0
                    }
                }
            ],
        }
    ]
}, { timestamps: true, versionKey: false });

export default mongoose.model('Attribute', Schema_Attribute);