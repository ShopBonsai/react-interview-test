import { authenticateGoogle } from '../../passport';
const jwt = require('jsonwebtoken');

const generateJWT = function (email: string, id: string) {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign(
        {
            email,
            id,
            exp: expirationDate.getTime() / 1000,
        },
        'secret'
    );
};

export default {
    Query: {
        user: async (_, __, { user }) => {
            if (!user) return null;
            return user;
        },
    },
    Mutation: {
        authGoogle: async (_, { accessToken }, { dataSources, req, res }) => {
            req.body = {
                ...req.body,
                access_token: accessToken,
            };

            try {
                // data contains the accessToken, refreshToken and profile from passport
                const { data, info } = await authenticateGoogle(req, res);

                if (data) {
                    const user = await dataSources.users.getOrCreate(data);

                    if (user) {
                        return {
                            name: user.name,
                            token: generateJWT(user.email, user._id),
                        };
                    }
                }

                if (info) {
                    switch (info.code) {
                        case 'ETIMEDOUT':
                            return new Error(
                                'Failed to reach Google: Try Again'
                            );
                        default:
                            return new Error('something went wrong');
                    }
                }
                return Error('server error');
            } catch (error) {
                return error;
            }
        },
    },
};
