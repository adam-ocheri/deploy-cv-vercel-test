"use strict";
exports.__esModule = true;
var express_1 = require("express");
var crypto_1 = require("crypto");
// import { linkedinAuthController, handleAuthCallbackController } from '../controllers/linkedinController';
var logoutController_1 = require("../controllers/logoutController");
var passport_1 = require("passport");
var router = (0, express_1.Router)();
// router.get('/linkedin', linkedinAuthController.handleAuthRequest);
router.get('/linkedin', function (req, res, next) {
    req.session.state = crypto_1["default"].randomBytes(16).toString('hex'); // generate a new state for each session
    passport_1["default"].authenticate('linkedin', { state: req.session.state })(req, res, next);
}, function (req, res) {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
    console.log('linkedin', { req: req, res: res });
});
// Callback route after login with linkedin
router.get('/linkedin/callback', passport_1["default"].authenticate('linkedin', {
    failureRedirect: process.env.CLIENT_URI
}, function (req, res) {
    // res.cookie('token', req.user.token, { httpOnly: true, sameSite: 'Strict' });
    res.redirect("".concat(process.env.CLIENT_URI, "/createResume"));
}));
// router.get('/linkedin/callback', handleAuthCallbackController.handleAuthCallback);
// Logout
router.post('/logout', logoutController_1.logoutController.logout);
exports["default"] = router;
