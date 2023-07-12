import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "boring-avatars";
import {
  MenuItem,
  Text,
  IconButton,
  CloseButton,
  Flex,
  MenuButton,
  MenuList,
  Menu,
} from "@chakra-ui/react";
import Button from "../Buttons";
import { RootState, AppDispatch } from "@/redux/store";
import router from "next/router";
import useIsMobile from "@/hooks/useIsMobile";
import MobileMenu from "./MobileMenu";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { pages } from "@/constants/router";
import { getUserProfile } from "@/redux/profileSlice";
import { logout } from "@/redux/auth/authSlice";

const HeaderLoggedIn = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prevState) => !prevState);

  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch: AppDispatch = useDispatch();
  const isMobile = useIsMobile();

  const handleProfileClick = async () => {
    try {
      if (user?.profileId) {
        dispatch(getUserProfile(user.profileId));
        router.push(pages.profileUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect to get user profile upon login
  useEffect(() => {
    if (user?.profileId) {
      dispatch(getUserProfile(user.profileId));
    }
  }, [user?.profileId, dispatch]);

  const handleCloseMenu = () => setMenuOpen(false);

  const handleButtonClick = () => {
    console.log("test button");
  };

  const handleInterviewClick = () => {
    router.push(pages.interviews.practice);
  };

  const handleCreateClick = () => {
    router.push(pages.profile.create);
  };

  const handleSettingsClick = () => {
    router.push(pages.auth.accountSettings);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push(pages.home);
  };

  return (
    <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu}>
      <Menu>
        {isMobile ? (
          <>
            <IconButton
              icon={<CloseButton size='lg' />}
              aria-label='Close'
              onClick={toggleMenu}
              alignSelf='flex-end'
            />
            <MenuItem onClick={handleCreateClick}>Create profile</MenuItem>
            {user && (
              <MenuItem
                fontWeight={700}
                justifyContent='space-between'
                onClick={handleSettingsClick}
              >
                <Text fontWeight={700}>{user.username}</Text>
                <Avatar
                  size={25}
                  name={user.id}
                  variant='marble'
                  colors={[
                    "#005E93",
                    "#127CB0",
                    "#34B3E4",
                    "#fffff",
                    "#f2f2f2",
                  ]}
                />
              </MenuItem>
            )}
            <MenuItem onClick={handleProfileClick}>My profile</MenuItem>
            <MenuItem onClick={handleInterviewClick}>
              Practice interview
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              color='error'
              fontWeight='semibold'
            >
              Log out
            </MenuItem>
          </>
        ) : (
          <Flex alignItems='center' gap={4}>
            <Button
              variant='tertiary'
              label='Profile'
              onClick={handleProfileClick}
            >
              My profile
            </Button>
            <Button
              variant='tertiary'
              label='Practice interview'
              onClick={handleInterviewClick}
            >
              Practice interview
            </Button>

            <Button
              variant='tertiary'
              label='Create'
              onClick={handleCreateClick}
            >
              Create profile
            </Button>
            <Menu>
              <MenuButton>
                <Flex gap='2px'>
                  <Avatar
                    size={40}
                    name={user?.id}
                    variant='marble'
                    colors={[
                      "#005E93",
                      "#127CB0",
                      "#34B3E4",
                      "#fffff",
                      "#f2f2f2",
                    ]}
                  />
                  <ChevronDownIcon height='31px' width='31px' />
                </Flex>
              </MenuButton>
              <MenuList p='10px' border='none' color='black'>
                {user && (
                  <MenuItem
                    fontWeight={700}
                    justifyContent='space-between'
                    onClick={handleSettingsClick}
                  >
                    <Text fontWeight={700}>{user.username}</Text>
                    <Avatar
                      size={25}
                      name={user.id}
                      variant='marble'
                      colors={[
                        "#005E93",
                        "#127CB0",
                        "#34B3E4",
                        "#fffff",
                        "#f2f2f2",
                      ]}
                    />
                  </MenuItem>
                )}
                {/* <MenuItem fontWeight={700}>Professional profile</MenuItem> */}
                <MenuItem
                  onClick={handleLogout}
                  color='error'
                  fontWeight='semibold'
                >
                  Log out
                </MenuItem>{" "}
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Menu>
    </MobileMenu>
  );
};

export default HeaderLoggedIn;
