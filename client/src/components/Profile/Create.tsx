import React, { useState, useCallback, ReactComponentElement } from 'react';
import {
  Box,
  Flex,
  Step,
  Stepper,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  StepIcon,
  StepNumber,
  useSteps,
  Tooltip,
  Heading,
  Stack,
  Icon,
} from '@chakra-ui/react';
import Button from '../Buttons';
import { useDispatch, useSelector } from 'react-redux';

import useIsMobile from '@/hooks/useIsMobile';

// import Button from '../Buttons';
import Details from './Details';
import Jobs from '@/components/Profile/Jobs';
import Education from '@/components/Profile/Education';
import Skills from '@/components/Profile/Skills';
import MoreInfo from '@/components/Profile/MoreInfo';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { pages } from '@/constants/router';
import { updateUserProfile } from '@/redux/profileSlice';

interface Step {
  name: string;
  index: number;
  description?: string;
  component: JSX.Element;
}

const steps: Step[] = [
  {
    name: 'Contact',
    index: 0,
    description: 'Contact details',
    component: <Details />,
  },
  {
    name: 'Jobs',
    index: 1,
    description: 'Work experience',
    component: <Jobs />,
  },
  {
    name: 'Education',
    index: 2,
    description: 'Education',
    component: <Education />,
  },
  { name: 'Skills', index: 3, description: 'Skills', component: <Skills /> },
  {
    name: 'More Info',
    index: 4,
    description: 'Add more',
    component: <MoreInfo />,
  },
];

export const CreateProfile = () => {
  const isMobile = useIsMobile();
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
    completed: false,
  });

  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const router = useRouter();

  const userContact = profile.contact[0];

  const [contact, setContact] = useState<Contact>({
    fullName: userContact?.fullName,
    location: userContact?.location,
    phoneNumber: userContact?.phoneNumber,
    email: userContact?.email,
    id: userContact?.id,
  });

  const handleDetailsChange = useCallback((newContact: Contact) => {
    setContact(newContact);
  }, []);

  // needs adjusments to handle the different steps
  const [stepComplete, setStepComplete] = useState(false);

  const isCompleteStep = (step: number) => {
    const { contact, education, jobs, skills } = profile;
    if (
      JSON.stringify(contact) !==
      JSON.stringify({
        email: '',
        fullName: '',
        id: '',
        location: '',
        phoneNumber: '',
      })
    )
      setStepComplete(true);
    if (education.length !== 0) setStepComplete(true);
    if (jobs.length !== 0) setStepComplete(true);
    console.log(stepComplete);
  };

  const handleNext = () => {
    dispatch({ type: 'profile/updateUserProfile', payload: contact });
    dispatch({ type: 'profile/addContact', payload: contact });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(profile);
    isCompleteStep(activeStep);
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSeeProfile = () => {
    // Update REDUX + DB
    dispatch(updateUserProfile(profile));
    router.push(pages.profileUser);
  };

  return (
    <Flex
      w='full'
      h='full'
      flexDir='column'
      alignItems='space-between'
      className='container'
    >
      <Stepper
        index={activeStep}
        my={4}
        color='#005e93'
        className='stepperContainer'
        size='sm'
        mx={2}
      >
        {steps.map(({ name, index, description }) => (
          <Step key={name} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            {!isMobile && (
              <Box flexShrink={0}>
                <StepTitle>{name}</StepTitle>
              </Box>
            )}
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 ? (
        <Details onChange={handleDetailsChange} contact={contact} />
      ) : (
        steps[activeStep].component
      )}
      <Flex justifyContent='space-between' mt='auto' mx={2}>
        <Button
          variant='tertiary'
          onClick={handlePrevious}
          disabled={activeStep === 0}
        >
          <Icon as={ArrowBackIcon} />
          Back
        </Button>

        {activeStep === steps.length - 1 ? (
          <Button variant='secondary' onClick={handleSeeProfile}>
            See your profile
          </Button>
        ) : (
          <Button
            variant='tertiary'
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            <Tooltip
              label='Clicking here will save your details'
              placement='top'
              fontSize='md'
              openDelay={500}
            >
              <Text fontWeight='700' fontSize='16px'>
                Next
              </Text>
            </Tooltip>
            <ArrowForwardIcon />
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default CreateProfile;
