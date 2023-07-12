/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { Box, Flex, Link, Container } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import CreateProfile from '@/components/Profile/Create';
import Education from '@/components/Profile/Education';
import WorkExperience from '@/components/Profile/Jobs';
import { Skills } from '@/components/Profile/Skills';
import { pages } from '@/constants/router';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { ProfileDrawer } from '@/components/Profile/ProfileDrawer';

type Props = {
  formData: any;
  setFormData: any;
};

const Create = () => {
  // Call the custume hook to fetch user data

  const router = useRouter();

  const [activeLink, setActiveLink] = useState('');

  const { user } = useSelector((state: RootState) => state.auth);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <AuthWrapper>
      <Box
        h='full'
        w='full'
        display='flex'
        flexDir='column'
        alignItems='flex-start'
        // justifyContent={'space-between'}
      >
        <ProfileDrawer
          openModal={false}
          setOpenModal={function (isOpen: boolean): void {
            throw new Error('Can not open modal.');
          }}
          option={''}
          itemId={''}
          setItemId={function (id: string): void {
            throw new Error('Id is not set.');
          }}
          iconType='document'
        />

        <Flex
          direction='column'
          alignItems='center'
          justifyContent='center'
          mt={6}
          w='full'
          h='full'
          overflowY={'auto'}
          // bg='blue.900'
        >
          <CreateProfile />
          <Container>{activeLink === 'Skills' && <Skills />}</Container>
          <Container>{activeLink === 'Education' && <Education />}</Container>
          <Container>
            {activeLink === 'WorkExperience' && <WorkExperience />}
          </Container>
        </Flex>
      </Box>
    </AuthWrapper>
  );
};

export default Create;
