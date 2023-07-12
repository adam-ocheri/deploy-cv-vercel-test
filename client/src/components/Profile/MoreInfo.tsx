import React, { useState } from 'react';
import { Box, Flex, Select, Heading } from '@chakra-ui/react';

// Form Components
import { VolunteerForm } from '@/components/Forms/VolunteerForm';
import { CertForm } from '@/components/Forms/CertForm';
import { CoursesForm } from '@/components/Forms/CoursesForm';
import { HonorsForm } from '@/components/Forms/HonorsForm';
import { LanguagesForm } from '@/components/Forms/LanguagesForm';
import { ProjectsForm } from '@/components/Forms/ProjectsForm';
import { PublicationsForm } from '@/components/Forms/PublicationsForm';
import { PatentsForm } from '@/components/Forms/PatentsForm';
import { RecommendationForm } from '@/components/Forms/RecommendationForm';

const MoreInfo = () => {
  const [value, setValue] = useState('');

  const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const forms: { [key: string]: JSX.Element } = {
    volunteer: <VolunteerForm />,
    certifications: <CertForm />,
    courses: <CoursesForm />,
    honorsAwards: <HonorsForm />,
    languages: <LanguagesForm />,
    projects: <ProjectsForm />,
    publications: <PublicationsForm />,
    patents: <PatentsForm />,
    recommendations: <RecommendationForm />,
  };

  return (
    <Flex flexDir='column' mx={2} gap={4}>
      <Heading display={['initial', 'none']} size='md'>
        Additional information
      </Heading>
      <Select
        placeholder='Select option to Add more Information'
        onChange={handleSelected}
      >
        <option value='volunteer'>Volunteer</option>
        <option value='certifications'>Certifications</option>
        <option value='courses'>Courses</option>
        <option value='honorsAwards'>Honour Awards</option>
        <option value='languages'>Languages</option>
        <option value='projects'>Projects</option>
        <option value='publications'>Publications</option>
        <option value='patents'>Patents</option>
        <option value='recommendations'>Recommendations</option>
      </Select>
      {forms[value]}
    </Flex>
  );
};

export default MoreInfo;
