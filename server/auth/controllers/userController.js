"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.updateUsername = exports.updatePassword = exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.addUser = exports.getUserDataController = void 0;
var ceeveeUsers_1 = require("../models/ceeveeUsers");
var passwords_1 = require("../../resume/utilities/passwords");
var jwt_1 = require("../../resume/utilities/jwt");
var email_1 = require("../../resume/config/email");
var zod_1 = require("zod");
var authUtils_1 = require("../../utils/authUtils");
var UserValidator = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
// @desc Get User Data
// @route GET /api/auth/me
// @access  Public
var getUserDataController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decodedToken, userId, user, error_1, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                decodedToken = (0, jwt_1.verifyAuthToken)(token);
                userId = decodedToken;
                return [4 /*yield*/, ceeveeUsers_1["default"].findById(userId.id)
                        .select('-password')
                        .lean()];
            case 2:
                user = _b.sent();
                res.status(200).json({ user: user, token: token });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                res.status(404).json({ message: 'User not found' });
                return [2 /*return*/];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _b.sent();
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getUserDataController = getUserDataController;
// @desc    Create User
// @route   POST /api/auth/register
// @access  Public
var addUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, password, user, hashedPassword, token, message, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = UserValidator.parse(req.body), username = _a.username, email = _a.email, password = _a.password;
                return [4 /*yield*/, ceeveeUsers_1["default"].findOne({ email: email }).select('-password')];
            case 1:
                user = _b.sent();
                // send a response with a message if the user already exists
                if (user) {
                    res.status(400).json({ message: 'User already exists' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, authUtils_1.saltHashPassword)(password)];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, ceeveeUsers_1["default"].create({ username: username, email: email, password: hashedPassword })];
            case 3:
                // Create a new user in the database
                user = _b.sent();
                token = (0, jwt_1.getAuthToken)(user.id, process.env.JWT_EXPIRES_IN);
                message = "Welcome to Ceevee, ".concat(username, " !");
                return [4 /*yield*/, (0, email_1.sendMail)({
                        email: "".concat(email),
                        subject: 'Welcome to Ceevee',
                        message: message
                    })];
            case 4:
                _b.sent();
                res.status(201).json({ user: user, token: token });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addUser = addUser;
// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, userPassword, userWithoutPassword, isPasswordCorrect, token, error_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, ceeveeUsers_1["default"].findOne({ email: email })];
            case 1:
                user = _c.sent();
                // send a response with a message if the user already exists
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                _b = user.toObject(), userPassword = _b.password, userWithoutPassword = __rest(_b, ["password"]);
                return [4 /*yield*/, (0, passwords_1.comparePassword)(password, userPassword)];
            case 2:
                isPasswordCorrect = _c.sent();
                if (!isPasswordCorrect) {
                    res.status(400).json({ message: 'Invalid credentials' });
                    return [2 /*return*/];
                }
                token = (0, jwt_1.getAuthToken)(user === null || user === void 0 ? void 0 : user.id, process.env.JWT_EXPIRES_IN);
                res.status(200).json({ user: userWithoutPassword, token: token });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _c.sent();
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var forgotPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, token, resetUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, ceeveeUsers_1["default"].findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                token = (0, jwt_1.getAuthToken)(user.id, '10m');
                resetUrl = "<html lang=\"en\" style=\"height: 100%\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />\n  <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n  <link\n    href=\"https://fonts.googleapis.com/css2?family=Barlow&family=Inter&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap\"\n    rel=\"stylesheet\"\n  />\n  <title>Document</title>\n  <style>\n    body {\n      font-family: 'Inter', sans-serif;\n      height: 100%;\n    }\n\n    .container {\n      max-width: 550px;\n      display: flex;\n      flex-direction: column;\n      gap: 1rem;\n      margin: 0 auto;\n    }\n\n    .reset-title {\n      font-size: 24px;\n      font-weight: bold;\n    }\n\n    .reset-subtitle {\n      font-size: 18px;\n    }\n\n    .reset-button {\n      outline: none;\n      border: none;\n      display: flex;\n      flex-direction: row;\n      justify-content: center;\n      align-items: center;\n      padding: 12px 10px;\n      gap: 10px;\n      background: linear-gradient(90deg, #005e93 0.03%, #34b3e4 96.47%);\n      box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.25);\n      border-radius: 10px;\n      font-weight: 700;\n      color: #fff;\n      font-size: 16px;\n      cursor: pointer;\n      text-decoration: none;\n    }\n\n    .reset-button:hover {\n      background: linear-gradient(90deg, #34b3e4 0.03%, #005e93 96.47%);\n    }\n\n    .message {\n      color: #000;\n    }\n\n    .signature {\n      color: initial;\n      font-weight: 700;\n    }\n\n    .signature-link {\n      color: initial;\n      font-weight: 700;\n      text-decoration: none;\n    }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <h1 class=\"reset-title\">Reset your password</h1>\n    <h2 class=\"reset-subtitle\">Hi, ".concat(email, "</h2>\n    <p class=\"message\">\n      Please click the button below to reset your password. The link will\n      expire in 10 minutes.\n    </p>\n    <a\n      href=\"http://localhost:3000/auth/reset-password?token=").concat(token, "\"\n      class=\"reset-button\"\n    >\n      Reset password\n    </a>\n    <p class=\"message\">\n      If you were not expecting this email, please ignore this message.\n    </p>\n    <p class=\"message\">\n      Thanks,<br />\n      <a class=\"signature-link\" href=\"https://www.ceevee.ai\" target=\"_blank\"\n        >CeeVee</a\n      >\n    </p>\n  </div>\n</body>\n</html>");
                return [4 /*yield*/, (0, email_1.sendMail)({
                        email: "".concat(email),
                        subject: 'Reset Password',
                        message: resetUrl
                    })];
            case 2:
                _a.sent();
                res.status(200).json({ message: 'Email sent' });
                return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword = forgotPassword;
var resetPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, decodedToken, user, hashedPassword;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!token) {
                    res.status(401).json({ message: ' no ceevee_accesstoken Unauthorized' });
                    return [2 /*return*/];
                }
                decodedToken = (0, jwt_1.verifyAuthToken)(token);
                return [4 /*yield*/, ceeveeUsers_1["default"].findById(decodedToken.id)];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(400).json({ message: 'Invalid user' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, authUtils_1.saltHashPassword)(req.body.password)];
            case 2:
                hashedPassword = _b.sent();
                // Set the new password
                user.password = hashedPassword;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                // Send a response with a message
                res.status(200).json({ message: 'Your password has been reset successfuly' });
                return [2 /*return*/];
        }
    });
}); };
exports.resetPassword = resetPassword;
var updateUsername = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, ceevee_accesstoken, decoded, user, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                username = req.body.username;
                ceevee_accesstoken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!ceevee_accesstoken) {
                    res.status(401).json({ message: ' no ceevee_accesstoken Unauthorized' });
                    return [2 /*return*/];
                }
                decoded = (0, jwt_1.verifyAuthToken)(ceevee_accesstoken);
                return [4 /*yield*/, ceeveeUsers_1["default"].findById(decoded.id).select('-password')];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                // Update the username
                user.username = username;
                return [4 /*yield*/, user.save()];
            case 2:
                _b.sent();
                user = user.toObject();
                // user = user.lean() TODOAUTH why doesnt it work
                // Send a response with a message
                res.status(200).json({ message: 'Username updated successfully', user: user });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _b.sent();
                res.status(500).send('Internal Server Error');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUsername = updateUsername;
var updatePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, password, newPassword, ceevee_accesstoken, decoded, user, isPasswordCorrect, hashedPassword, error_6;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                _a = req.body, password = _a.password, newPassword = _a.newPassword;
                ceevee_accesstoken = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
                if (!ceevee_accesstoken) {
                    res.status(401).json({ message: ' no ceevee_accesstoken Unauthorized' });
                    return [2 /*return*/];
                }
                decoded = (0, jwt_1.verifyAuthToken)(ceevee_accesstoken);
                return [4 /*yield*/, ceeveeUsers_1["default"].findById(decoded.id)];
            case 1:
                user = _c.sent();
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, passwords_1.comparePassword)(password, user.password)];
            case 2:
                isPasswordCorrect = _c.sent();
                if (!isPasswordCorrect) {
                    res.status(400).json({ message: 'Invalid credentials' });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, authUtils_1.saltHashPassword)(newPassword)];
            case 3:
                hashedPassword = _c.sent();
                // Update the password
                user.password = hashedPassword;
                return [4 /*yield*/, user.save()];
            case 4:
                _c.sent();
                // Send a response with a message
                res.status(200).json({ message: 'Password updated successfully' });
                return [3 /*break*/, 6];
            case 5:
                error_6 = _c.sent();
                res.status(500).json({ message: 'Internal Server Error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updatePassword = updatePassword;
exports["default"] = getUserDataController;
