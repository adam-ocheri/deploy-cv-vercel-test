// types/global.d.ts

export {};

declare global {
  interface Profile {
    [key: string]: any;
    contact: Contact[];
    jobs: Jobs[];
    education: Education[];
    skills: Skills[];
    volunteer: Volunteer[];
    certifications: Certificates[];
    courses: Courses[];
    honorsAwards: Honors[];
    languages: Languages[];
    projects: Projects[];
    publications: Publications[];
    patents: Patents[];
    recommendations: Recommendations[];
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
}
