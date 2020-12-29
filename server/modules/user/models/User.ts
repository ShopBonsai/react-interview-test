import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    social: {
        facebookProvider: {
            id: String,
            token: String,
        },
        googleProvider: {
            id: String,
            token: String,
        },
    },
});
