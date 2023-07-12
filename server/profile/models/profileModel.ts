import mongoose from 'mongoose';
// import { CeeveeUser } from '../../auth/models/ceeveeUsers';

const profileSchema = new mongoose.Schema({
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
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'CeeveeUser' },
    userId: { type: String },
});

const Profile = mongoose.model<ProfileInterface>('Profile', profileSchema);

export { Profile };

interface ProfileInterface {
    contact: Contact[];
    jobs: Jobs[];
    education: Education[];
    skills: Skills[];
    volunteer: Volunteer[];
    certifications: Certification[];
    courses: Courses[];
    honorsAwards: Honors[];
    languages: Language[];
    projects: Project[];
    publications: Publication[];
    patents: Patent[];
    recommendations: Recommendation[];
    user: string;
}

interface Contact {
    fullName: string;
    location: string;
    phoneNumber: string;
    email: string;
    id: string;
}
interface Jobs {
    jobTitle: string;
    startDate: string;
    endDate: string;
    company: string;
    location: string;
    id: string;
    description: string;
}
interface Education {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: string;
    endDate?: string;
    id: string;
}
interface Skills {
    name: string;
    endorsements: number;
    id: string;
}
interface Volunteer {
    organization: string;
    role: string;
    startDate: string;
    endDate?: string;
    location: string;
    description: string;
    id: string;
}
interface Certification {
    name: string;
    authority: string;
    licenseNumber?: string;
    startDate: string;
    endDate?: string;
    id: string;
}
interface Courses {
    name: string;
    number?: string;
    provider: string;
    completionDate: string;
    id: string;
}
interface Honors {
    title: string;
    issuer: string;
    issueDate: string;
    description?: string;
    id: string;
}
interface Language {
    name: string;
    proficiencyLevel?: string;
    proficiency?: number;
    id: string;
}
interface Project {
    name: string;
    description: string;
    teamMembers?: string[] | undefined;
    startDate: string;
    endDate?: string;
    id: string;
}
interface Publication {
    title: string;
    publisher: string;
    publicationDate: string;
    description?: string;
    id: string;
}
interface Patent {
    title: string;
    patentOffice: string;
    issueDate: string;
    description?: string;
    id: string;
}
interface Recommendation {
    recommenderName: string;
    relationship: string;
    recommendationText: string;
    id: string;
}
