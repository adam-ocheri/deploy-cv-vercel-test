"use strict";
exports.__esModule = true;
exports.Profile = void 0;
var mongoose_1 = require("mongoose");
// import { CeeveeUser } from '../../auth/models/ceeveeUsers';
var profileSchema = new mongoose_1["default"].Schema({
    contact: Array,
    jobs: Array,
    education: Array,
    skills: Array,
    volunteer: Array,
    certifications: Array,
    courses: Array,
    honorsAwards: Array,
    languages: Array,
    projects: Array,
    publications: Array,
    patents: Array,
    recommendations: Array,
    user: { type: mongoose_1["default"].Schema.Types.ObjectId, ref: 'CeeveeUser' },
    userId: { type: String }
});
var Profile = mongoose_1["default"].model('Profile', profileSchema);
exports.Profile = Profile;
