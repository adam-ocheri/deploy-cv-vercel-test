import React, { useState } from 'react';
import {
  Box,
  Container,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';

interface ProfileStepperProps {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  isActiveStep: (step: number) => boolean;
  goToNext: () => void;
  goToPrevious: () => void;
}

export const ProfileStepper = ({
  activeStep,
  setActiveStep,
  isActiveStep,
  goToNext,
  goToPrevious,
}: ProfileStepperProps) => {
  return (
    <>
      {/* <ProfileDrawer/> */}
      <Container border='1px' maxW='750px' mt={4}>
        <Stepper index={activeStep} maxW={'full'} overflowX={'scroll'}>
          {/* {profileProgress.map((step, index) => (
            <Step key={index}>
              <StepIndicator flexDirection='column'>
                <StepStatus
                  complete={index < activeStep}
                  incomplete={index > activeStep}
                  active={index === activeStep}
                />
              </StepIndicator>
              <StepSeparator />
              <Box>
                <StepTitle>{step.label}</StepTitle>
              </Box>
            </Step>
          ))} */}
        </Stepper>
      </Container>
    </>
  );
};

export default ProfileStepper;
