"use strict";
exports.__esModule = true;
exports.config = void 0;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config({ path: './.env' });
exports.config = {
    openAiKey: process.env.OPENAI_API_KEY
};
