const mongoose = require('mongoose');
const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

describe('GRAPHQL Endpoints', () => {
    afterAll(async() => {
        try {
            await mongoose.disconnect();
        } catch (error) {
            throw error;
        }
    });
    const user = {
        userId: 'df7aa083-7b59-45fd-a036-31efa59212c7',
        firstName:'Shopper',
        lastName: 'Userton',
        email: 'bonsaieri.shopperton@email.com',
        likes:[]
    }
    const productBrand = {
        productId: '6e73c7a1-d59f-48d3-b547-ca7504ed581d',
        name: 'ANIM Underwear',
        price: 516.2,
        color: 'tempor',
        size: 'L',
        brand: 'Pansy Espinoza'
    }
    it('GET PRODUCTS', async (done) => {
        const query = '{ merchants { guid merchant products { id name price description color size image } } }'
        request
            .post('/graphql')
            .send({
                query: query,
            })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data).toBeInstanceOf(Object);
                expect(res.body.data.merchants).toBeInstanceOf(Array);
                expect(res.body.data.merchants.length).toEqual(1);
                expect(res.body.data.merchants[0]).toHaveProperty('merchant');
                expect(res.body.data.merchants[0].merchant).toEqual('CORPULSE');
                expect(res.body.data.merchants[0]).toHaveProperty('products');
                expect(res.body.data.merchants[0].products).toBeInstanceOf(Array);
                expect(res.body.data.merchants[0].products.length).toEqual(5);
                expect(res.body.data.merchants[0].products[0]).toHaveProperty('id');
                expect(res.body.data.merchants[0].products[0].id).toEqual('37b4d1b7-ed3c-4d28-91e0-ef0fb89b2b12');
                done();
            });
    });
    it('GET USER BY ID', async (done) => {
        request
            .post('/graphql')
            .send({
                query: `{ user(userId: "${user.userId}") { userId firstName lastName email likes } }`
            })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200)
            .end( (err, res) => {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data).toBeInstanceOf(Object);
                expect(res.body.data.user).toBeInstanceOf(Object);
                expect(res.body.data.user).toHaveProperty('firstName');
                expect(res.body.data.user.firstName).toEqual(user.firstName);
                expect(res.body.data.user).toHaveProperty('firstName');
                expect(res.body.data.user.lastName).toEqual(user.lastName);
                expect(res.body.data.user).toHaveProperty('email');
                expect(res.body.data.user.email).toEqual(user.email);
                expect(res.body.data.user.likes).toBeInstanceOf(Array);
                expect(res.body.data.user.likes).toEqual([]);
                done();
            });
    });
    it('STORES A LIKED PRODUCT', async(done) => {
        request
            .post('/graphql')
            .send({
                query: `mutation { setLikedItem(userId: "${user.userId}", productId: "${productBrand.productId}") { isLiked } }`
            })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data).toBeInstanceOf(Object);
                expect(res.body.data).toHaveProperty('setLikedItem');
                expect(res.body.data.setLikedItem).toHaveProperty('isLiked');
                expect(res.body.data.setLikedItem.isLiked).toEqual(true);
                done();
            })
    });
    it('GET PRODUCT BY ID WITH BRAND', async (done) => {
        request
            .post('/graphql')
            .send({
                query: `{ productById(productId: "${productBrand.productId}") { name brand price color size } }`
            })
            .set('Accept', 'application/json')
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data).toBeInstanceOf(Object);
                expect(res.body.data.productById).toBeInstanceOf(Object);
                expect(res.body.data.productById).toHaveProperty('brand');
                expect(res.body.data.productById.brand).toEqual(productBrand.brand);
                expect(res.body.data.productById).toHaveProperty('color');
                expect(res.body.data.productById.color).toEqual(productBrand.color);
                expect(res.body.data.productById).toHaveProperty('price');
                expect(res.body.data.productById.price).toEqual(productBrand.price);
                expect(res.body.data.productById).toHaveProperty('size');
                expect(res.body.data.productById.size).toEqual(productBrand.size);
                done();
            })
    })
})
