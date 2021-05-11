import { productData } from './productCard';

export const merchantData = {
    merchant: 'Vandelay Industries',
    companyDescription: 'A longer description '.repeat(20),
    logo: 'www.url.com/logo.png',
    publishedState: true,
    products: [
        { ...productData, id: 0 },
        { ...productData, id: 1 },
        { ...productData, id: 2 },
    ],
};
