"use strict";
exports.__esModule = true;
exports.Resume = void 0;
var mongoose_1 = require("mongoose");
var LinkedInExperienceSchema = new mongoose_1["default"].Schema({
    title: { type: String },
    company: { type: String },
    startDate: { type: String },
    endDate: { type: String || null },
    location: { type: String },
    description: { type: String }
});
var LinkedInEducationSchema = new mongoose_1["default"].Schema({
    school: { type: String },
    degree: { type: String },
    fieldOfStudy: { type: String },
    startDate: { type: String },
    endDate: { type: String || null }
});
var LinkedInSkillSchema = new mongoose_1["default"].Schema({
    name: { type: String },
    endorsements: { type: Number }
});
var LinkedInAddressSchema = new mongoose_1["default"].Schema({
    street1: { type: String },
    street2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String }
});
var LinkedInVolunteerSchema = new mongoose_1["default"].Schema({
    organization: { type: String },
    role: { type: String },
    startDate: { type: String },
    endDate: { type: String || null },
    location: { type: String },
    description: { type: String }
});
var LinkedInCertificationSchema = new mongoose_1["default"].Schema({
    name: { type: String },
    authority: { type: String },
    licenseNumber: { type: String },
    startDate: { type: String },
    endDate: { type: String || null }
});
var LinkedInCoursesSchema = new mongoose_1["default"].Schema({
    name: { type: String },
    number: { type: String },
    provider: { type: String },
    completionDate: { type: String }
});
var LinkedInHonorsAwardsSchema = new mongoose_1["default"].Schema({
    title: { type: String },
    issuer: { type: String },
    issueDate: { type: String },
    description: { type: String }
});
var LinkedInLanguageSchema = new mongoose_1["default"].Schema({
    name: { type: String },
    proficiencyLevel: { type: String },
    proficiency: { type: Number }
});
var LinkedInProjectSchema = new mongoose_1["default"].Schema({
    name: { type: String },
    description: { type: String },
    teamMembers: { type: [String] },
    startDate: { type: String },
    endDate: { type: String || null }
});
var LinkedInPublicationSchema = new mongoose_1["default"].Schema({
    title: { type: String },
    publisher: { type: String },
    publicationDate: { type: String },
    description: { type: String }
});
var LinkedInPatentSchema = new mongoose_1["default"].Schema({
    title: { type: String },
    patentOffice: { type: String },
    issueDate: { type: String },
    description: { type: String }
});
var LinkedInRecommendationSchema = new mongoose_1["default"].Schema({
    recommenderName: { type: String },
    relationship: { type: String },
    recommendationText: { type: String }
});
var ResumeSchema = new mongoose_1["default"].Schema({
    firstName: { type: String },
    lastName: { type: String },
    headline: { type: String },
    summary: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: [LinkedInAddressSchema] },
    experiences: { type: [LinkedInExperienceSchema] },
    education: { type: [LinkedInEducationSchema] },
    skills: { type: [LinkedInSkillSchema] },
    volunteer: { type: [LinkedInVolunteerSchema] },
    certifications: { type: [LinkedInCertificationSchema] },
    courses: { type: [LinkedInCoursesSchema] },
    honorsAwards: { type: [LinkedInHonorsAwardsSchema] },
    languages: { type: [LinkedInLanguageSchema] },
    projects: { type: [LinkedInProjectSchema] },
    publications: { type: [LinkedInPublicationSchema] },
    patents: { type: [LinkedInPatentSchema] },
    recommendations: { type: [LinkedInRecommendationSchema] }
});
var Resume = mongoose_1["default"].model('Resume', ResumeSchema);
exports.Resume = Resume;
