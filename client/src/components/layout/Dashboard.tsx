import React from 'react';
// import Image from 'next/image';
import { useSelector } from 'react-redux';
import { Box, Flex, Link, Heading, Image } from '@chakra-ui/react';
import { RootState } from '../../redux/store';
import logo from '../../images/ceeveenewlogo.png';
import HeaderLogin from './HeaderLogin';
import HeaderLoggedIn from './HeaderLoggedIn';
import { pages } from '@/constants/router';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleLogoLink = () => {
    router.push(pages.home);
  };

  return (
    <Flex
      h='80px'
      bg='white'
      p={[4, 2, 2, 2, 0]}
      boxShadow='lg'
      alignItems='center'
      justifyContent={'center'}
    >
      <Flex
        maxW={'1200px'}
        justifyContent='space-between'
        w='full'
        alignItems='center'
      >
        <Link
          onClick={handleLogoLink}
          textDecoration='none'
          _hover={{
            textDecoration: 'underline',
            textDecorationThickness: '2px',
            textUnderlineOffset: '4px',
          }}
        >
          <Flex alignItems='center' gap={2}>
            <Image src={logo.src} alt='CeeVee Logo' boxSize={8} />
            <Heading fontWeight={700} as='h3' size='md'>
              CeeVee
            </Heading>
          </Flex>
        </Link>

        {user ? <HeaderLoggedIn /> : <HeaderLogin />}
      </Flex>
    </Flex>
  );
};

export default Dashboard;
