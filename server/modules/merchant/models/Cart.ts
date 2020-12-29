import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CartSchema = new Schema({
    userId: String,
    items: [
        {
            id: String,
            name: String,
            image: String,
            price: Number,
            quantity: Number,
        },
    ],
});
