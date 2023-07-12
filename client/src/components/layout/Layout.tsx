import Dashboard from './Dashboard';
import { ReactNode } from 'react';
import { Box, Flex } from '@chakra-ui/react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Dashboard />
      <Flex
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 80px)'
      >
        <Box
          alignSelf='center'
          bg='white'
          borderRadius='xl'
          overflow='hidden'
          boxShadow='2xl'
          h={['calc(100% - 1rem)', '90%']}
          maxW={'750px'}
          w='full'
          p={[6, 12]}
          m={2}
        >
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
