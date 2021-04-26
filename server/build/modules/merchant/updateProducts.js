"use strict";
exports.__esModule = true;
exports.updateProducts = void 0;
var mockMerchantData_1 = require("../../mockMerchantData");
/*************************************************************************
 * Updates the database based on products returned by the frontend
 * @param _root - Root Value. Undefined by default
 * @param data  - Mutation data containing product information
 * @returns     - Updated merchant database
 * @todo        - Refactor code so that only changed products are handled
 *************************************************************************/
var updateProducts = function (_root, data) {
    var products = data.products;
    mockMerchantData_1.merchants.forEach(function (merchant) {
        var newProducts = products.filter(function (product) { return merchant.index === product.merchant; });
        merchant.products = newProducts;
    });
    return mockMerchantData_1.merchants;
};
exports.updateProducts = updateProducts;
