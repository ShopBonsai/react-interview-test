// #1 Import Express and Apollo Server
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './modules/graphql-schema';
import { UserSchema } from './modules/user/models/User';
import { CartSchema } from './modules/merchant/models/Cart';
import { OrderSchema } from './modules/merchant/models/Order';
import Carts from './modules/merchant/datasources/carts';
import Orders from './modules/merchant/datasources/orders';
import Users from './modules/user/datasources/users';
const jwt = require('jsonwebtoken');

import mongoose from 'mongoose';

export const mongodbConn = mongoose.createConnection(
    'mongodb://localhost:27017/bonsai'
);
const UserModel = mongodbConn.model('User', UserSchema);
const CartModel = mongodbConn.model('Cart', CartSchema);
const OrderModel = mongodbConn.model('Order', OrderSchema);

// #5 Initialize an Apollo server
const server = new ApolloServer({
    schema,
    dataSources: () => ({
        carts: new Carts(CartModel),
        orders: new Orders(OrderModel),
        users: new Users(UserModel),
    }),
    context: async ({ req, res }) => {
        let user = null;
        const token = (req.headers && req.headers.authorization) || '';

        if (token) {
            await jwt.verify(token, 'secret', async (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'Unauthorized!' });
                }
                user = await UserModel.findOne({
                    _id: decoded.id,
                });
            });
        }

        return { req, res, user };
    },
});

// #6 Initialize an Express application
const app = express();

// #7 Use the Express application as middleware in Apollo server
server.applyMiddleware({ app });

// #8 Set the port that the Express application will listen to
app.listen({ port: 3000 }, () => {
    console.log(`Server running on http://localhost:3000${server.graphqlPath}`);
});
