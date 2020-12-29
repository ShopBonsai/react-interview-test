import { authenticateGoogle } from '../../passport';
import { merchants } from './mockMerchantData';

let products = [];
for (let merchant of merchants) {
    products = [...products, ...merchant.products];
}

export default {
    Query: {
        merchants: () => {
            return merchants;
        },
        cart: async (_, __, { dataSources, user }) => {
            const cart = await dataSources.carts.get();
            return {
                success: true,
                cart,
            };
        },
        orders: async (_, __, { dataSources, user }) => {
            if (!user) return null;
            const orders = await dataSources.orders.get();
            return {
                success: true,
                orders,
            };
        },
    },
    Mutation: {
        addToCart: async (
            _,
            { productId, quantity },
            { dataSources, user }
        ) => {
            if (!user) return null;
            const cart = await dataSources.carts.get();
            const product = products.find(product => product.id == productId);
            if (!product) {
                return {
                    success: false,
                    message: `There's no product with the id: ${productId}`,
                };
            }
            if (cart) {
                const cartItem = cart.items.find(item => item.id == productId);

                if (cartItem) {
                    const updatedQuantity = cartItem.quantity + quantity;
                    await dataSources.carts.updateItemQuantity(
                        productId,
                        updatedQuantity
                    );
                } else {
                    await dataSources.carts.addItem(
                        {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                        },
                        quantity
                    );
                }
            } else {
                await dataSources.carts.create(
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                    },
                    quantity
                );
            }
            return {
                success: true,
                message: `Successfuly added ${quantity} ${product.name} to the cart`,
                cart: await dataSources.carts.get(),
            };
        },

        updateCart: async (
            _,
            { productId, quantity },
            { dataSources, user }
        ) => {
            if (!user) return null;
            const cart = await dataSources.carts.get();
            const product = products.find(product => product.id == productId);
            if (!product) {
                return {
                    success: false,
                    message: `There's no product with the id: ${productId}`,
                };
            }
            if (cart) {
                const cartItem = cart.items.find(item => item.id == productId);

                if (cartItem) {
                    await dataSources.carts.updateItemQuantity(
                        productId,
                        quantity
                    );
                } else {
                    return {
                        success: false,
                        message: `Your cart doesn't contain any product with the id: ${productId}`,
                    };
                }
            } else {
                return {
                    success: false,
                    message: "There's no existing cart to update",
                };
            }
            return {
                success: true,
                message: `Successfuly updated ${product.name} to ${quantity} in the cart`,
                cart: await dataSources.carts.get(),
            };
        },

        createOrder: async (_, __, { dataSources, user }) => {
            if (!user) return null;
            const cart = await dataSources.carts.get();
            if (!cart || cart.items.length === 0) {
                return {
                    success: false,
                    message: "There's no existing cart to order",
                };
            }
            const order = await dataSources.orders.create(cart.items);
            await dataSources.carts.delete();

            return {
                success: true,
                message: 'Successfuly placed your order',
            };
        },
    },
};
