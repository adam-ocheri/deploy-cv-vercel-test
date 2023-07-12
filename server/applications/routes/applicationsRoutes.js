"use strict";
exports.__esModule = true;
var express_1 = require("express");
var applicationsController_1 = require("../controller/applicationsController");
var router = (0, express_1.Router)();
router.route('/applications').post(applicationsController_1.createApplication).get(applicationsController_1.getMyApplications);
router.route('/applications/:id')["delete"](applicationsController_1.deleteApplication).put(applicationsController_1.updateApplication).get(applicationsController_1.getApplication);
exports["default"] = router;
