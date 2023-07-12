"use strict";
exports.__esModule = true;
var express_1 = require("express");
var coverLettersController_1 = require("../controllers/coverLettersController");
var router = (0, express_1.Router)();
router.route('/coverLetter').post(coverLettersController_1.createCoverLetter).get(coverLettersController_1.getMyCoverLetter);
router.route('/coverLetter/:id')["delete"](coverLettersController_1.deleteCoverLetter);
exports["default"] = router;
