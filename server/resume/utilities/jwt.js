"use strict";
exports.__esModule = true;
exports.verifyAuthToken = exports.getAuthToken = void 0;
/* eslint-disable no-undef */
var jsonwebtoken_1 = require("jsonwebtoken");
var getAuthToken = function (id, expiryTime) {
    return jsonwebtoken_1["default"].sign({ id: id }, String(process.env.JWT_SECRET), {
        expiresIn: expiryTime
    });
};
exports.getAuthToken = getAuthToken;
var verifyAuthToken = function (token) {
    return jsonwebtoken_1["default"].verify(token, String(process.env.JWT_SECRET));
};
exports.verifyAuthToken = verifyAuthToken;
