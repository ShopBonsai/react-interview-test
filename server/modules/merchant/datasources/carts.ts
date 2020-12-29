import mongoose from 'mongoose';

import { MongoDataSource } from 'apollo-datasource-mongodb';

import {
    ObjectId,
    UpdateWriteOpResult,
    InsertOneWriteOpResult,
    DeleteWriteOpResultObject,
} from 'mongodb';

interface UserDocument {
    _id: ObjectId;
    name: string;
}

interface Context {
    user: UserDocument;
}

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
}

interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface Cart {
    _id: ObjectId;
    userId: string;
    cart: [CartItem];
}

export default class Carts extends MongoDataSource<mongoose.Document, Context> {
    get(): Promise<[Cart]> {
        return this.collection.findOne({ userId: this.context.user._id });
    }

    create(
        product: Product,
        quantity: number
    ): Promise<InsertOneWriteOpResult<Cart>> {
        return this.collection.insertOne({
            userId: this.context.user._id,
            createdOn: Date.now(),
            items: [
                {
                    ...product,
                    quantity,
                },
            ],
        });
    }

    delete(): Promise<DeleteWriteOpResultObject> {
        return this.collection.deleteOne({ userId: this.context.user._id });
    }

    addItem(product: Product, quantity: number): Promise<UpdateWriteOpResult> {
        return this.collection.updateOne(
            { userId: this.context.user._id },
            {
                $push: {
                    items: {
                        $each: [{ ...product, quantity }],
                    },
                },
            }
        );
    }

    updateItemQuantity(
        productId: string,
        quantity: number
    ): Promise<UpdateWriteOpResult> {
        if (quantity === 0) {
            return this.collection.updateOne(
                { userId: this.context.user._id },
                {
                    $pull: {
                        items: {
                            id: productId,
                        },
                    },
                }
            );
        } else {
            return this.collection.updateOne(
                { userId: this.context.user._id, 'items.id': productId },
                { $set: { 'items.$.quantity': quantity } }
            );
        }
    }
}
