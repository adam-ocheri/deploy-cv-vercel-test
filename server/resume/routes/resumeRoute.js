"use strict";
exports.__esModule = true;
var express_1 = require("express");
var resumeController_1 = require("../controllers/resumeController");
var router = (0, express_1.Router)();
router.route('/resumes').post(resumeController_1.createResume).get(resumeController_1.getResumes);
router.route('/resumes/:id').put(resumeController_1.updateResume)["delete"](resumeController_1.deleteResume);
exports["default"] = router;
