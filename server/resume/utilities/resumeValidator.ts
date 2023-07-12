import { z } from 'zod';

const ResumeValidator = z.object({
    firstName: z.string(),
    lastName: z.string(),
    headline: z.string(),
    summary: z.string(),
    profilePicture: z.string(), // doesn't appear anywhere else? Will come from LinkedIn
    emailAddress: z.string().email(),
    phone: z.string(),
    address: z.object({
        street1: z.string().optional(),
        street2: z.string().nullable(),
        city: z.string(),
        state: z.string().optional(),
        country: z.string().optional(),
        postalCode: z.string().optional(),
    }),
    experiences: z
        .array(
            z.object({
                title: z.string(),
                company: z.string(),
                startDate: z.string(),
                endDate: z.string().nullable(),
                location: z.string(),
                description: z.string(),
            })
        )
        .optional(),
    education: z
        .array(
            z.object({
                school: z.string(),
                degree: z.string(),
                fieldOfStudy: z.string().nullable(),
                startDate: z.string(),
                endDate: z.string().nullable(),
            })
        )
        .optional(),
    skills: z.array(z.object({ name: z.string(), endorsements: z.number() })).optional(),
    volunteer: z
        .array(
            z.object({
                organization: z.string(),
                role: z.string(),
                startDate: z.string(),
                endDate: z.string().nullable(),
                location: z.string(),
                description: z.string(),
            })
        )
        .optional(),
    certifications: z
        .array(
            z.object({
                name: z.string(),
                authority: z.string(),
                licenseNumber: z.string().nullable(),
                startDate: z.string(),
                endDate: z.string().nullable(),
            })
        )
        .optional(),
    courses: z
        .array(
            z.object({
                name: z.string(),
                number: z.string().nullable(),
                provider: z.string(),
                completionDate: z.string(),
            })
        )
        .optional(),
    honorsAwards: z
        .array(
            z.object({
                title: z.string(),
                issuer: z.string(),
                issueDate: z.string(),
                description: z.string().nullable(),
            })
        )
        .optional(),
    languages: z
        .array(
            z.object({ name: z.string(), proficiencyLevel: z.string().nullable(), proficiency: z.number().nullable() })
        )
        .optional(),
    projects: z
        .array(
            z.object({
                name: z.string(),
                description: z.string(),
                teamMembers: z.array(z.string()).nullable(),
                startDate: z.string(),
                endDate: z.string().nullable(),
            })
        )
        .optional(),
    publications: z
        .array(
            z.object({
                title: z.string(),
                publisher: z.string(),
                publicationDate: z.string(),
                description: z.string().nullable(),
            })
        )
        .optional(),
    patents: z
        .array(
            z.object({
                title: z.string(),
                patentOffice: z.string(),
                issueDate: z.string(),
                description: z.string().nullable(),
            })
        )
        .optional(),
    recommendations: z
        .array(z.object({ recommenderName: z.string(), relationship: z.string(), recommendationText: z.string() }))
        .optional(),
});

export { ResumeValidator };
