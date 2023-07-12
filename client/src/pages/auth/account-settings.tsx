import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Button,
  Heading,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pages } from "@/constants/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  resetStatus,
  updatePassword,
  updateUsername,
} from "@/redux/auth/authSlice";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import AuthWrapper from "@/components/auth/AuthWrapper";

export const ResetPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();

  const { user, token, isSuccess, isError, message, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(user?.username);

  useEffect(() => {
    // if (isError) {
    //   toast({
    //     title: "Error.",
    //     description: `${message}`,
    //     status: "error",
    //     duration: 9000,
    //     isClosable: true,
    //     position: "top-right",
    //   });
    //   //   dispatch(reset());
    // }

    if (isSuccess && message) {
      toast({
        title: "Success",
        description: `${message}`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
    dispatch(resetStatus());
  }, [isSuccess, message, router, dispatch, toast]);

  useEffect(() => {
    setUsername(user?.username);
  }, [user]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };
  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username?.length) {
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
    dispatch(updateUsername({ token, username }) as any);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error.",
        description: `Passwords do not match.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
      // Reset the input values
    }
    if (password?.length < 8) {
      toast({
        title: "Error.",
        description: `Password should be at least 8 characters long.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    if (newPassword === confirmPassword) {
      dispatch(updatePassword({ token, password, newPassword }) as any);
    }
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <AuthWrapper>
      <Box>
        <Box>
          <Heading>Account settings</Heading>
        </Box>
        <Box as="form" onSubmit={handleUsernameUpdate}>
          <FormControl>
            <FormLabel mt="24px" fontWeight="700" fontSize="16px">
              Username
            </FormLabel>
            <Input
              type="text"
              id="username"
              value={username}
              placeholder={username}
              onChange={handleUsernameChange}
              isRequired
            />
            <Button
              mt="24px"
              type="submit"
              bg="success"
              color="white"
              fontWeight="700"
              fontSize="16px"
              _hover={{ bg: "#87A567" }}
              borderRadius="10px"
              disabled={username === user?.username}
            >
              Update User Name
            </Button>
          </FormControl>
        </Box>
        <Box as="form" onSubmit={handlePasswordUpdate}>
          <FormControl>
            <FormLabel mt="24px" fontWeight="700" fontSize="16px">
              Password
            </FormLabel>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              isRequired
            />
            <FormLabel mt="24px" fontWeight="700" fontSize="16px">
              New password
            </FormLabel>
            <Input
              type={showPassword ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              isRequired
            />
            <FormLabel mt="24px" fontWeight="700" fontSize="16px">
              Repeat new password
            </FormLabel>
            <Input
              type={showPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              isRequired
            />
            <FormControl>
              <Checkbox
                onChange={(e) => setShowPassword(e.target.checked)}
                colorScheme="blue"
                fontSize="sm"
                mb={2}
              >
                Show Passwords
              </Checkbox>
            </FormControl>
            <Button
              mt="24px"
              type="submit"
              bg="success"
              color="white"
              fontWeight="700"
              fontSize="16px"
              _hover={{ bg: "#87A567" }}
              borderRadius="10px"
            >
              Reset my password
            </Button>
          </FormControl>
        </Box>
      </Box>
    </AuthWrapper>
  );
};

export default ResetPassword;
