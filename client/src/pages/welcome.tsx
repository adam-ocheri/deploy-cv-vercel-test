import {
  Box,
  Text,
  Flex,
  useTheme,
  Container,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import theme from '@/styles/theme';

import { useRouter } from 'next/router';
import Button from '@/components/Buttons';
import ChatTextSend from '@/components/ChatTextSend';
import useIsMobile from '@/hooks/useIsMobile';
import { pages } from '@/constants/router';
import AuthWrapper from '@/components/auth/AuthWrapper';

// The First page that comes after login
const WelcomePage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useIsMobile();

  const handleCreateClick = () => {
    router.push(pages.profile.create);
  };

  return (
    <AuthWrapper>
      <Card variant='filled' h={['full', 'initial']}>
        <CardHeader>
          <Heading size='lg'>Welcome to CeeVee!</Heading>
        </CardHeader>
        <CardBody fontWeight='medium' fontSize='lg'>
          <Text>I am here to help you get your dream job!</Text>
          <Text my={4}>
            I am currently offering few services to make you a star candidate.{' '}
          </Text>
          <Text my={4}>
            First, I need to get to know you, Let&apos;s start by creating your
            profile.
          </Text>
          <Text>After that we can practice interviews!</Text>
        </CardBody>
        <CardFooter>
          <Button variant='primary' block onClick={handleCreateClick}>
            Create a profile
          </Button>
        </CardFooter>
      </Card>
    </AuthWrapper>
  );
};

export default WelcomePage;
