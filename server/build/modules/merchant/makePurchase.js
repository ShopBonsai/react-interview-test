"use strict";
exports.__esModule = true;
exports.makePurchase = void 0;
var purchases = [];
/************************************************************************
 * Saves purchase to backend
 * @param _root - Root value. Undefined by default
 * @param data  - Data containing purchase information
 * @returns     - Returns true when purchase was computed successfully
 ***********************************************************************/
var makePurchase = function (_root, data) {
    var purchase = data.purchase;
    purchases.push(purchase);
    return true;
};
exports.makePurchase = makePurchase;
