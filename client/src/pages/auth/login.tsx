import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import LinkNext from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { pages } from "@/constants/router";
import useIsMobile from "@/hooks/useIsMobile";
import { login, reset } from "@/redux/auth/authSlice";
import { RootState } from "@/redux/store";
import IsValidTokenWrapper from "@/components/auth/IsValidTokenWrapper";
import LandingPage from "@/components/LandingPage";

const Login = () => {
  const { message, isSuccess } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push(pages.welcome);
    }
  }, [isSuccess, router]);

  const handleEmailChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      dispatch(
        login({
          email,
          password,
        }) as any
      );
    }
  };

  const isMobile = useIsMobile();
  // const handleLinkedinLogin = () => {
  //   window.location.href = `${process.env.NEXT_PUBLIC_SERVER_PORT}/auth/linkedin`;
  // };

  const handleMargin = () => (isMobile ? "24px" : "50px");

  return (
    <IsValidTokenWrapper>
      {/* <Flex direction="row" w="1024px"> */}
      <Box width={"full"} p={handleMargin()}>
        <Flex direction="column" alignItems="center" h="full">
          <Heading mb="20px">Login</Heading>
          <Box onSubmit={handleSubmit} w={"full"}>
            <Flex as="form" direction={"column"} gap={30}>
              <Flex direction="column">
                <FormControl id="email" mb="5px" isRequired>
                  <FormLabel fontWeight={"bold"}>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </FormControl>
              </Flex>

              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                rounded={6}
              >
                <FormControl id="password" mb="5px" isRequired>
                  <FormLabel fontWeight={"bold"}>Password</FormLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </FormControl>

                <FormControl>
                  <Checkbox
                    onChange={(e) => setShowPassword(e.target.checked)}
                    colorScheme="blue"
                    fontSize="sm"
                    mb={2}
                  >
                    Show Password
                  </Checkbox>
                </FormControl>

                <Flex gap={2} my={2}>
                  <Text fontSize="sm" m={0}>
                    Forgot your password?
                  </Text>
                  <Box mb={0} fontSize="sm">
                    <LinkNext href={pages.auth.forgotPassword}>
                      Reset here
                    </LinkNext>
                  </Box>
                </Flex>
              </Flex>

              <Flex>
                <Button
                  w="100%"
                  type="submit"
                  color="white"
                  bgGradient="linear(to-r, blueStart, blueEnd)"
                  boxShadow="-7px 8px 20px 0px #003D5F47"
                >
                  Submit
                </Button>
              </Flex>

              <Flex alignItems="center" justifyContent="center">
                <Text fontSize="sm" mb={0}>
                  Dont have an account yet?
                </Text>
                <Box mb={0} fontSize="sm">
                  <LinkNext href={pages.auth.register}>Join Here</LinkNext>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Box>
      {/* need more widtj, which is determined by Layout */}
      {/* <LandingPage /> */}
      {/* </Flex> */}
    </IsValidTokenWrapper>
  );
};

export default Login;
