"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var OauthUserSchema = new mongoose_1.Schema({
    linkedinId: { type: String },
    firstName: {
        localized: {
            en_US: { type: String }
        }
    },
    lastName: {
        localized: {
            en_US: { type: String }
        }
    },
    profilePicture: { type: String },
    accessToken: { type: String }
});
exports["default"] = (0, mongoose_1.model)('OauthUser', OauthUserSchema);
