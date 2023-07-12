import { Box, Spinner } from '@chakra-ui/react';

export const LoadingSpinner = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      h='100%'
      backgroundColor='gray.200'
      opacity={0.5}
    >
      <Spinner
        thickness='4px'
        speed='0.90s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Box>
  );
};
