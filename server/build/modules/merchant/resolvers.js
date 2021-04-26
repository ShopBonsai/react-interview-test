"use strict";
exports.__esModule = true;
exports.resolvers = void 0;
var mockMerchantData_1 = require("../../mockMerchantData");
var editMerchant_1 = require("./editMerchant");
var analytics_1 = require("./analytics");
var updateProducts_1 = require("./updateProducts");
var makePurchase_1 = require("./makePurchase");
exports.resolvers = {
    Query: {
        merchants: function () { return mockMerchantData_1.merchants; },
        getAnalyticsData: analytics_1.getAnalyticsData
    },
    Mutation: {
        editMerchant: editMerchant_1.editMerchant,
        addPageVisit: analytics_1.addPageVisit,
        addDatabaseAccess: analytics_1.addDatabaseAccess,
        updateProducts: updateProducts_1.updateProducts,
        makePurchase: makePurchase_1.makePurchase
    }
};
