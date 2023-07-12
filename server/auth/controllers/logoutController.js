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
exports.__esModule = true;
exports.logoutController = void 0;
var oauthUsers_1 = require("../models/oauthUsers");
var ceeveeUsers_1 = require("../models/ceeveeUsers");
exports.logoutController = {
    logout: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var profilePicture, oauthUserProfile, ceeveeUserProfile, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("req.header:", req.headers);
                        console.log("req.body:", req.body);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        profilePicture = req.headers.profilePicture;
                        return [4 /*yield*/, oauthUsers_1["default"].findOne({ profilePicture: profilePicture })];
                    case 2:
                        oauthUserProfile = _a.sent();
                        return [4 /*yield*/, ceeveeUsers_1["default"].findOne({ profilePicture: profilePicture })];
                    case 3:
                        ceeveeUserProfile = _a.sent();
                        console.log(oauthUserProfile, "oauthUserProfile");
                        console.log(ceeveeUserProfile, "ceeveeUserProfile");
                        if (!oauthUserProfile) return [3 /*break*/, 5];
                        return [4 /*yield*/, oauthUserProfile.deleteOne()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!ceeveeUserProfile) return [3 /*break*/, 7];
                        return [4 /*yield*/, ceeveeUserProfile.deleteOne()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        // Clear the cookie
                        res.cookie('ceevee_accesstoken', "", { maxAge: 0, httpOnly: false });
                        // Send a success response
                        res.status(200).send({ message: 'Logout successful' });
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        //  console.error(error)
                        res.status(500).send('Internal Server Error');
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
};
// export const logoutController = {
//   async logout(req: Request, res: Response): Promise<void> {
//     console.log("req.header:", req.headers);
//     console.log("req.body:", req.body);
//     const { profilePicture } = req.body;
//     const ceevee_accesstoken = req.headers.authorization?.split(' ')[1];
// try {
//       if (!ceevee_accesstoken) {
//         res.status(401).json({ message: ' no ceevee_accesstoken Unauthorized' });
//         return;
//       }
//       // Find ceeveeUser by  profilePicture  
//       // Find OauthUser by matching profilePicture with CeeveeUser
//         const ceeveeUserProfile = await CeeveeUser.findOne({ profilePicture });
//         const oauthUserProfile = await OauthUser.findOne({ profilePicture });
//         if (oauthUserProfile?.profilePicture === ceeveeUserProfile?.profilePicture) {
//           await oauthUserProfile?.deleteOne();
//           await ceeveeUserProfile?.deleteOne();
//         }
//                 // Clear the cookie
//       res.cookie('ceevee_accesstoken', "", { maxAge: 0, httpOnly: false });
//       //Send a success response
//       res.status(200).send({ message: 'Logout successful'}); 
//       }  catch (error) {
//              console.error(error)
//               res.status(500).send('Internal Server Error')
//             }
//           }
//         }
// get ceevee_accesstoken from the frontend
// search for user from the CeeveeUser collection using the profilePicture 
// match the profilePicture from the CeeveeUser to the OauthUser
// use find one and delete from both CeeveeUser and the OuthUser  
