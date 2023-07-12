import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Button,
  Heading,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pages } from "@/constants/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { reset, resetPassword, resetStatus } from "@/redux/auth/authSlice";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import IsValidTokenWrapper from "@/components/auth/IsValidTokenWrapper";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();

  const { isSuccess, message, isLoading, token } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isSuccess && !token) {
      toast({
        title: "Success",
        description: `${message}`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      dispatch(resetStatus());
      router.push(pages.auth.login);
    }
  }, [isSuccess, message, router, dispatch, toast, token]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    // if (password !== confirmPassword) {

    // }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    //TODO is it neccessary
    // Extract the token from the router query. query can be array
    // const token = Array.isArray(router.query.token)
    //   ? router.query.token[0]
    //   : router.query.token;
    const token = router.query.token as string;
    if (password !== confirmPassword) {
      toast({
        title: "Error.",
        description: `Passwords do not match.`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });

      // Reset the input values
      if (password) {
        setPassword("");
      }
      if (confirmPassword) {
        setConfirmPassword("");
      }
      return;
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

    if (password === confirmPassword && token) {
      dispatch(resetPassword({ password, token }) as any);
    }
  };
  if (isLoading) return <LoadingSpinner />;

  return (
    <IsValidTokenWrapper>
      <Box as="form" onSubmit={handleResetPassword}>
        <Box>
          <Heading>Create new password</Heading>
        </Box>
        <FormControl>
          <Text fontFamily="Inter" mt="24px">
            Your new password must be different from previous used password.
          </Text>
          <FormLabel mt="24px" fontWeight="700" fontSize="16px">
            Password
          </FormLabel>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            isRequired
          />
          <FormLabel mt="24px" fontWeight="700" fontSize="16px">
            Repeat password
          </FormLabel>
          <Input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
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
          >
            Reset my password
          </Button>
        </FormControl>
      </Box>
    </IsValidTokenWrapper>
  );
};

export default ResetPassword;
