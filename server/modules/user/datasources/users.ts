import mongoose from 'mongoose';

import { MongoDataSource } from 'apollo-datasource-mongodb';

interface UserDocument {
    _id: string;
    name: string;
}

interface Context {
    user: UserDocument;
}

interface User {
    _id: string;
    email: string;
    social: {
        googleProvider: {
            id: string;
            token: string;
        };
    };
}

export default class Users extends MongoDataSource<mongoose.Document, Context> {
    async getOrCreate({ accessToken, refreshToken, profile }): Promise<User> {
        const user = await this.collection.findOne({
            'social.googleProvider.id': profile.id,
        });
        if (!user) {
            const newUser = {
                name:
                    profile.displayName ||
                    `${profile.familyName} ${profile.givenName}`,
                email: profile.emails[0].value,
                social: {
                    googleProvider: {
                        id: profile.id,
                        token: accessToken,
                    },
                },
            };
            const result = await this.collection.insertOne(newUser);
            return result.ops[0];
        }
        return user;
    }
}
