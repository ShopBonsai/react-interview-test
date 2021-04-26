"use strict";
exports.__esModule = true;
exports.editMerchant = void 0;
var mockMerchantData_1 = require("../../mockMerchantData");
/*****************************************************************
 * Edits a merchant's published state
 * @param _root   - Root value. Undefined by default
 * @param data    - Data arguments for the mutation
 * @returns       - Edited merchant
 *****************************************************************/
var editMerchant = function (_root, data) {
    var index = data.index, publishedState = data.publishedState;
    mockMerchantData_1.merchants[index].publishedState = publishedState;
    return mockMerchantData_1.merchants[index];
};
exports.editMerchant = editMerchant;
