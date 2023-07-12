import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgGradient: 'linear(to-r, #005E93, #34B3E4)',
        minHeight: '100vh',
        minWidth: '100vw',
      },
    },
  },
  colors: {
    success: '#9CBF78',
    error: '#BF3636',
    blueStart: '#005E93',
    blueEnd: '#34B3E4',
    menuListBG: '#F2F2F2',
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  textStyles: {
    sText: {
      fontSize: '16px',
      fontWeight: '600',
    },
    mText: {
      fontSize: '16px',
      fontWeight: '700',
    },
    lText: {
      fontSize: '32px',
      fontWeight: '700',
    },
  },
});

export default theme;
