"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var CeeveeUserSchema = new mongoose_1["default"].Schema({
    username: { type: String },
    ceevee_accesstoken: { type: String },
    email: { type: String },
    password: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    passwordChangedAt: { type: Date }
});
exports["default"] = mongoose_1["default"].model('CeeveeUser', CeeveeUserSchema);
