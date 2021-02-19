class ProductController {
    constructor() {}
    
    addToCart(userId, productId, productCount) {
        const USER_ID_LENGTH = 36;
        const PRODUCT_ID_LENGTH = 36;
        if (typeof userId != "string" || userId.length != USER_ID_LENGTH) {
            throw new Error("Invalid user id");
        }

        if(typeof productId != "string" || userId.length != PRODUCT_ID_LENGTH) {
            throw new Error("Invalid productId id");
        }
        
        try {
            console.log({ userId, productId, productCount }); //this is where we would add to the db.
            return [{userId, productId, productCount}];
        } catch(e) {
            throw new Error("error adding to db");
        }
    }
}

module.exports.ProductController = ProductController;