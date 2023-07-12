"use strict";
exports.__esModule = true;
var express_1 = require("express");
var db_1 = require("./resume/config/db");
// import cookieParser from 'cookie-parser';
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
// Routes
var resumeRoute_1 = require("./resume/routes/resumeRoute");
var linkdeinRoute_1 = require("./auth/routes/linkdeinRoute");
var authRoutes_1 = require("./auth/routes/authRoutes");
var profileRoute_1 = require("./profile/routes/profileRoute");
var coverLetterRoute_1 = require("./coverLetters/routes/coverLetterRoute");
var applicationsRoutes_1 = require("./applications/routes/applicationsRoutes");
var interviewRoutes_1 = require("./interview/routes/interviewRoutes");
// import ceeveeItRoutes from './profile/routes/ceeveeItRoute';
//PASSPORT
var passport_1 = require("passport");
var express_session_1 = require("express-session");
// Passport config
require("./resume/config/passportStrategies");
dotenv_1["default"].config({ path: './.env' });
var PORT = process.env.PORT || 4000;
(0, db_1.connectDB)();
var app = (0, express_1["default"])();
console.log('APP');
app.use((0, cors_1["default"])())
    .use((0, express_1.json)())
    .use((0, express_session_1["default"])({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
    .use(passport_1["default"].initialize())
    .use(passport_1["default"].session());
app.use('/auth', linkdeinRoute_1["default"]);
app.use('/api', resumeRoute_1["default"]);
app.use('/api/auth', authRoutes_1["default"]);
app.use('/api/', profileRoute_1["default"]);
app.use('/api/', coverLetterRoute_1["default"]);
app.use('/api/', applicationsRoutes_1["default"]);
app.use('/interviews', interviewRoutes_1["default"]);
app.get('/', function (req, res) {
    res.send('Hello from App Engine!');
});
app.listen(PORT, function () {
    // eslint-disable-next-line no-undef, no-console
    console.log("Server is running on port ".concat(PORT));
});
