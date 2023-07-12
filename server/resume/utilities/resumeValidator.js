"use strict";
exports.__esModule = true;
exports.ResumeValidator = void 0;
var zod_1 = require("zod");
var ResumeValidator = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    headline: zod_1.z.string(),
    summary: zod_1.z.string(),
    profilePicture: zod_1.z.string(),
    emailAddress: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    address: zod_1.z.object({
        street1: zod_1.z.string().optional(),
        street2: zod_1.z.string().nullable(),
        city: zod_1.z.string(),
        state: zod_1.z.string().optional(),
        country: zod_1.z.string().optional(),
        postalCode: zod_1.z.string().optional()
    }),
    experiences: zod_1.z
        .array(zod_1.z.object({
        title: zod_1.z.string(),
        company: zod_1.z.string(),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string().nullable(),
        location: zod_1.z.string(),
        description: zod_1.z.string()
    }))
        .optional(),
    education: zod_1.z
        .array(zod_1.z.object({
        school: zod_1.z.string(),
        degree: zod_1.z.string(),
        fieldOfStudy: zod_1.z.string().nullable(),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string().nullable()
    }))
        .optional(),
    skills: zod_1.z.array(zod_1.z.object({ name: zod_1.z.string(), endorsements: zod_1.z.number() })).optional(),
    volunteer: zod_1.z
        .array(zod_1.z.object({
        organization: zod_1.z.string(),
        role: zod_1.z.string(),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string().nullable(),
        location: zod_1.z.string(),
        description: zod_1.z.string()
    }))
        .optional(),
    certifications: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string(),
        authority: zod_1.z.string(),
        licenseNumber: zod_1.z.string().nullable(),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string().nullable()
    }))
        .optional(),
    courses: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string(),
        number: zod_1.z.string().nullable(),
        provider: zod_1.z.string(),
        completionDate: zod_1.z.string()
    }))
        .optional(),
    honorsAwards: zod_1.z
        .array(zod_1.z.object({
        title: zod_1.z.string(),
        issuer: zod_1.z.string(),
        issueDate: zod_1.z.string(),
        description: zod_1.z.string().nullable()
    }))
        .optional(),
    languages: zod_1.z
        .array(zod_1.z.object({ name: zod_1.z.string(), proficiencyLevel: zod_1.z.string().nullable(), proficiency: zod_1.z.number().nullable() }))
        .optional(),
    projects: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        teamMembers: zod_1.z.array(zod_1.z.string()).nullable(),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string().nullable()
    }))
        .optional(),
    publications: zod_1.z
        .array(zod_1.z.object({
        title: zod_1.z.string(),
        publisher: zod_1.z.string(),
        publicationDate: zod_1.z.string(),
        description: zod_1.z.string().nullable()
    }))
        .optional(),
    patents: zod_1.z
        .array(zod_1.z.object({
        title: zod_1.z.string(),
        patentOffice: zod_1.z.string(),
        issueDate: zod_1.z.string(),
        description: zod_1.z.string().nullable()
    }))
        .optional(),
    recommendations: zod_1.z
        .array(zod_1.z.object({ recommenderName: zod_1.z.string(), relationship: zod_1.z.string(), recommendationText: zod_1.z.string() }))
        .optional()
});
exports.ResumeValidator = ResumeValidator;
