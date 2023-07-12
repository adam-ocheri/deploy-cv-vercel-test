import { Flex, Image, Text, Heading, Link } from '@chakra-ui/react';
import Button from './Buttons';
// import Link from 'next/link';
import { pages } from '@/constants/router';
import logo from '../images/ceeveenewlogo.png';

// Desktop Screen - Right Side - For the Home Page
const LandingPage = () => {
  return (
    <Flex
      overflowY={'auto'}
      flexDirection='column'
      justifyContent={['space-between', 'flex-start']}
      h='full'
      gap={[0, 6]}
      alignItems='center'
    >
      <Flex
        maxW='full'
        justify='space-between'
        alignItems='center'
        gap={4}
        flexDir={['column', 'column', 'row']}
      >
        <Image
          src={logo.src}
          alt='ceevee logo'
          objectFit='cover'
          maxW={['50%', 'full']}
        />
        <Heading
          bgGradient='linear(to-r, blueStart, blueEnd)'
          bgClip='text'
          fontWeight='black'
          lineHeight='base'
          alignContent='center'
          fontSize={['3xl', '5xl']}
        >
          Empower Your Career Journey with CeeVee
        </Heading>
      </Flex>
      <Text fontSize={['xl', '2xl']} fontWeight='medium' lineHeight='taller'>
        Revolutionize your job search with AI-powered resume optimization,
        tailored cover letters, and personalized interview preparation.
      </Text>
      <Link
        href={pages.profile.create}
        mt={[0, 0, 'auto']}
        _hover={{ textDecorations: 'none' }}
      ></Link>
    </Flex>
  );
};

export default LandingPage;
