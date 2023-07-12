import mongoose from 'mongoose';

const LinkedInExperienceSchema = new mongoose.Schema<LinkedInExperience>({
    title: { type: String },
    company: { type: String },
    startDate: { type: String },
    endDate: { type: String || null },
    location: { type: String },
    description: { type: String },
});

const LinkedInEducationSchema = new mongoose.Schema<LinkedInEducation>({
    school: { type: String },
    degree: { type: String },
    fieldOfStudy: { type: String },
    startDate: { type: String },
    endDate: { type: String || null },
});

const LinkedInSkillSchema = new mongoose.Schema<LinkedInSkill>({
    name: { type: String },
    endorsements: { type: Number },
});

const LinkedInAddressSchema = new mongoose.Schema<LinkedInAddress>({
    street1: { type: String },
    street2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
});

const LinkedInVolunteerSchema = new mongoose.Schema<LinkedInVolunteer>({
    organization: { type: String },
    role: { type: String },
    startDate: { type: String },
    endDate: { type: String || null },
    location: { type: String },
    description: { type: String },
});

const LinkedInCertificationSchema = new mongoose.Schema<LinkedInCertification>({
    name: { type: String },
    authority: { type: String },
    licenseNumber: { type: String },
    startDate: { type: String },
    endDate: { type: String || null },
});

const LinkedInCoursesSchema = new mongoose.Schema<LinkedInCourses>({
    name: { type: String },
    number: { type: String },
    provider: { type: String },
    completionDate: { type: String },
});

const LinkedInHonorsAwardsSchema = new mongoose.Schema<LinkedInHonorsAwards>({
    title: { type: String },
    issuer: { type: String },
    issueDate: { type: String },
    description: { type: String },
});

const LinkedInLanguageSchema = new mongoose.Schema<LinkedInLanguage>({
    name: { type: String },
    proficiencyLevel: { type: String },
    proficiency: { type: Number },
});

const LinkedInProjectSchema = new mongoose.Schema<LinkedInProject>({
    name: { type: String },
    description: { type: String },
    teamMembers: { type: [String] },
    startDate: { type: String },
    endDate: { type: String || null },
});

const LinkedInPublicationSchema = new mongoose.Schema<LinkedInPublication>({
    title: { type: String },
    publisher: { type: String },
    publicationDate: { type: String },
    description: { type: String },
});

const LinkedInPatentSchema = new mongoose.Schema<LinkedInPatent>({
    title: { type: String },
    patentOffice: { type: String },
    issueDate: { type: String },
    description: { type: String },
});

const LinkedInRecommendationSchema = new mongoose.Schema<LinkedInRecommendation>({
    recommenderName: { type: String },
    relationship: { type: String },
    recommendationText: { type: String },
});

const ResumeSchema = new mongoose.Schema<LinkedInProfile>({
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
    recommendations: { type: [LinkedInRecommendationSchema] },
});

const Resume = mongoose.model<LinkedInProfile>('Resume', ResumeSchema);

export { Resume };

interface LinkedInExperience {
    title: string;
    company: string;
    startDate: string;
    endDate?: string | null;
    location: string;
    description: string;
}

interface LinkedInEducation {
    school: string;
    degree: string;
    fieldOfStudy?: string | null;
    startDate: string;
    endDate?: string | null;
}

interface LinkedInSkill {
    name: string;
    endorsements: number;
}

interface LinkedInAddress {
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

interface LinkedInVolunteer {
    organization: string;
    role: string;
    startDate: string;
    endDate?: string | null;
    location: string;
    description: string;
}

interface LinkedInCertification {
    name: string;
    authority: string;
    licenseNumber?: string | null;
    startDate: string;
    endDate?: string | null;
}

interface LinkedInCourses {
    name: string;
    number?: string | null;
    provider: string;
    completionDate: string;
}

interface LinkedInHonorsAwards {
    title: string;
    issuer: string;
    issueDate: string;
    description?: string | null;
}

interface LinkedInLanguage {
    name: string;
    proficiencyLevel?: string | null;
    proficiency?: number | null;
}

interface LinkedInProject {
    name: string;
    description: string;
    teamMembers?: string[] | null;
    startDate: string;
    endDate?: string | null;
}

interface LinkedInPublication {
    title: string;
    publisher: string;
    publicationDate: string;
    description?: string | null;
}

interface LinkedInPatent {
    title: string;
    patentOffice: string;
    issueDate: string;
    description?: string | null;
}

interface LinkedInRecommendation {
    recommenderName: string;
    relationship: string;
    recommendationText: string;
}
export interface LinkedInProfile {
    firstName: string;
    lastName: string;
    headline: string;
    summary: string;
    email: string;
    phone: string;
    address?: [LinkedInAddress];
    experiences?: [LinkedInExperience];
    education?: [LinkedInEducation];
    skills?: [LinkedInSkill];
    volunteer?: [LinkedInVolunteer];
    certifications?: [LinkedInCertification];
    courses?: [LinkedInCourses];
    honorsAwards?: [LinkedInHonorsAwards];
    languages?: [LinkedInLanguage];
    projects?: [LinkedInProject];
    publications?: [LinkedInPublication];
    patents?: [LinkedInPatent];
    recommendations?: [LinkedInRecommendation];
}
