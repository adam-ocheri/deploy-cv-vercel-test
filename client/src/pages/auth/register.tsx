import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useColorMode,
  Text,
  Button,
  Heading,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { pages } from "@/constants/router";
import { register } from "@/redux/auth/authSlice";
import IsValidTokenWrapper from "@/components/auth/IsValidTokenWrapper";
import { RootState } from "@/redux/store";

const Register = () => {
  const router = useRouter();
  // states and refs
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const toast = useToast();
  const { toggleColorMode } = useColorMode();
  // const handleLinkedinLogin = () => {
  //   window.location.href = `${process.env.NEXT_PUBLIC_SERVER_PORT}/auth/linkedin`;
  // };

  // redux
  const dispatch = useDispatch();
  const { isError, message, isSuccess, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  // useEffects
  useEffect(() => {
    if (isSuccess) {
      router.push(pages.welcome);
    }
  }, [isError, isSuccess, message, router, dispatch]);

  // handlers
  // email input is a useRef hook, type is not a form event
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValidEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // console.log(isValidEmailRegex.test(enteredEmail || ""));
    setEmail(e.target.value);
    return isValidEmailRegex.test(email);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.length) {
      toast({
        title: "Error.",
        description: `Please enter a valid username.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (!email.length || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      console.log("email", email);

      toast({
        title: "Error.",
        description: `Please enter a valid email.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Error.",
        description: `Password must be at least 8 characters long.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Error.",
        description: `Passwords do not match.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (email && !handleEmailChange) {
      toast({
        title: "Error.",
        description: `Please enter a valid email.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (username && email && password) {
      dispatch(
        register({
          username,
          email,
          password,
        }) as any
      );
    }
  };

  return (
    <IsValidTokenWrapper>
      <Flex direction="column" p="50px" rounded={6} h="full">
        <Heading alignSelf="center" mb="20px">
          Join
        </Heading>
        <Box as="form">
          <Flex
            direction="column"
            justifyContent="center"
            m={0}
            rounded={6}
            maxW="600px"
            gap="13px"
          >
            <FormControl
              id="username"
              isRequired
              colorScheme="linkedin"
              mb="5px"
            >
              <FormLabel>User Name</FormLabel>
              <Input
                value={username}
                type="text"
                name="username"
                onChange={handleUsernameChange}
                required
              />
            </FormControl>
            <FormControl
              id="email"
              isRequired
              colorScheme="linkedin"
              // isInvalid={}
            >
              <FormLabel>Email</FormLabel>
              <Input
                onChange={handleEmailChange}
                value={email}
                type="email"
                name="email"
                required
              />
            </FormControl>
            <FormControl
              id="password"
              mb="5px"
              isRequired
              colorScheme="linkedin"
            >
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={handlePasswordChange}
                name="password"
                required
              />
            </FormControl>
            <FormControl
              id="confirm-password"
              mb="5px"
              isRequired
              colorScheme="linkedin"
            >
              <FormLabel>Repeat Password</FormLabel>
              <Input
                value={confirmPassword}
                type={showPassword ? "text" : "password"}
                onChange={handleConfirmPasswordChange}
                name="password"
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

            <Button
              bgGradient="linear(to-r, blueStart, blueEnd)"
              onClick={handleSubmit}
              color="white"
              w="100%"
              boxShadow="-7px 8px 20px 0px #003D5F47"
              // isDisabled={}
            >
              Create account
            </Button>
            <Flex gap={2} mt={2}>
              <Text fontSize="sm" mb={0}>
                Already have an account user?
              </Text>
              <Box mb={0} fontSize="sm">
                <Link href={pages.auth.login}>Login Here</Link>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </IsValidTokenWrapper>
  );
};

export default Register;
