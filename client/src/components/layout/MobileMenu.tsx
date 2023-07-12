import React, { ReactNode } from 'react';
import { Flex, IconButton, Menu, MenuButton, Slide } from '@chakra-ui/react';
import useIsMobile from '@/hooks/useIsMobile';
import { AiOutlineMenu } from 'react-icons/ai';
import theme from '@/styles/theme';

interface MobileMenuProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ children, isOpen, onClose }: MobileMenuProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<AiOutlineMenu size={'2rem'} />}
          border='none'
          variant='outline'
          onClick={onClose}
        />
        <Slide direction='right' in={isOpen} style={{ zIndex: 10 }}>
          <Flex
            position='fixed'
            top='0'
            right='0'
            bottom='0'
            bg='menuListBG'
            width='50%'
            p={4}
            gap={4}
            direction='column'
            boxShadow='md'
            zIndex='1'
          >
            {children}
          </Flex>
        </Slide>
      </Menu>
    );
  }
  return <>{children}</>;
};

export default MobileMenu;
