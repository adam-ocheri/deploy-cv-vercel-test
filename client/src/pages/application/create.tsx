// import useIsMobile from '@/hooks/useIsMobile';
import AuthWrapper from '@/components/auth/AuthWrapper';
import {
  Box,
  Text,
  useTheme,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
// import axios from "axios";
import { useRef } from 'react';
// import { useDispatch } from "react-redux";

const CreateApplication = () => {
  // const isMobile = useIsMobile();
  const theme = useTheme();
  const applicationLinkRef = useRef<HTMLInputElement>(null);
  const jobTitleRef = useRef<HTMLInputElement>(null);
  const applicationCompanyRef = useRef<HTMLInputElement>(null);

  // const dispatch = useDispatch();

  const handleOneClickBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    const applicationLink = applicationLinkRef.current?.value;
    const jobTitle = jobTitleRef.current?.value;
    const applicationCompany = applicationCompanyRef.current?.value;
    const applicationJobDescription = console.log(
      'application fields:',
      applicationLink
    );

    // const response = await axios.post();

    // handle the post application
  };

  return (
    <AuthWrapper>
      <Box p='25px' w={'full'}>
        <Text sx={theme.textStyles.lText} lineHeight='39px'>
          New Application
        </Text>

        <Flex
          as='form'
          direction='column'
          alignItems='center'
          justifyContent='center'
          m={0}
          gap='31px'
        >
          <FormControl id='applicationLink' isRequired color='#252525' mb='5px'>
            <FormLabel>Job Application link</FormLabel>
            <Input ref={applicationLinkRef} type='url' name='applicationLink' />
          </FormControl>

          <FormControl id='jobTitle' isRequired color='#252525' mb='5px'>
            <FormLabel>Job title</FormLabel>
            <Input ref={jobTitleRef} type='text' name='jobTitle' required />
          </FormControl>

          <FormControl
            id='applicationCompany'
            isRequired
            color='#252525'
            mb='5px'
          >
            <FormLabel>Company</FormLabel>
            <Input
              ref={applicationCompanyRef}
              type='text'
              name='applicationCompany'
            />
          </FormControl>
        </Flex>
      </Box>
    </AuthWrapper>
  );
};

export default CreateApplication;
