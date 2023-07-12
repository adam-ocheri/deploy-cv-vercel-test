"use strict";
exports.__esModule = true;
var express_1 = require("express");
var interviewController_1 = require("../controllers/interviewController");
var router = (0, express_1.Router)();
router
    .get('/ping', function (req, res) { return res.status(204).send(null); })
    .get('/question/random', (0, interviewController_1.getRandomQuestion)())
    .post('/answer/feedback', (0, interviewController_1.giveFeedback)());
exports["default"] = router;
