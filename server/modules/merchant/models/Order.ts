import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const OrderSchema = new Schema({
    userId: String,
    orderDate: Date,
    status: {
        type: String,
        enum: ['Unfulfilled', 'Fulfilled'],
        default: 'Unfulfilled',
    },
    shippedDate: Date,
    orderItems: [
        {
            id: String,
            name: String,
            image: String,
            price: Number,
            quantity: Number,
        },
    ],
});
