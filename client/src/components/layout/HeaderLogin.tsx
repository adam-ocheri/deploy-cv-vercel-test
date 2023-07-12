import React, { useState } from 'react';
import Button from '../Buttons';
import router from 'next/router';
import useIsMobile from '@/hooks/useIsMobile';
import MobileMenu from './MobileMenu';
import {
  CloseButton,
  Flex,
  IconButton,
  Menu,
  MenuItem,
} from '@chakra-ui/react';
import { pages } from '@/constants/router';

const HeaderLogin = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prevState) => !prevState);
  const handleCloseMenu = () => setMenuOpen(false);
  const isMobile = useIsMobile();

  const handleLoginButtonClick = () => {
    router.push(pages.auth.login);
  };

  const handleRegisterButtonClick = () => {
    router.push(pages.auth.register);
  };

  return (
    <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu}>
      <Menu>
        {isMobile ? (
          <>
            <IconButton
              icon={<CloseButton size='lg' />}
              aria-label='Close'
              onClick={handleCloseMenu}
              alignSelf='flex-end'
            />
            <MenuItem>
              <Button block variant='primary' onClick={handleLoginButtonClick}>
                Login
              </Button>
            </MenuItem>
            <MenuItem>
              <Button
                block
                variant='secondary'
                onClick={handleRegisterButtonClick}
              >
                Register
              </Button>
            </MenuItem>
          </>
        ) : (
          <Flex gap='4'>
            <Button variant='primary' onClick={handleLoginButtonClick}>
              Login
            </Button>
            <Button variant='secondary' onClick={handleRegisterButtonClick}>
              Register
            </Button>
          </Flex>
        )}
      </Menu>
    </MobileMenu>
  );
};

export default HeaderLogin;
