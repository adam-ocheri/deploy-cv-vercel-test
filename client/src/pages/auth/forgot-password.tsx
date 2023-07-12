import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { pages } from "@/constants/router";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, reset } from "@/redux/auth/authSlice";
import { RootState } from "@/redux/store";
import IsValidTokenWrapper from "@/components/auth/IsValidTokenWrapper";

export const ForgotPassword = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const { isSuccess, isError, message, token } = useSelector(
    (state: RootState) => state.auth
  );
  // const formBackground = useColorModeValue("gray.100", "gray.700");
  // const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
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
    dispatch(forgotPassword({ email }) as any);
  };

  useEffect(() => {
    if (!token) {
      console.log("forgot password reset");
      dispatch(reset());
    }
  }, [token, dispatch, router]);

  useEffect(() => {
    if (isSuccess && message) {
      toast({
        title: "Success",
        description: `${message}`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      dispatch(reset());
      router.push(pages.home);
    }
  }, [isError, isSuccess, message, router, dispatch, toast]);

  return (
    <IsValidTokenWrapper>
      <Box as="form" onSubmit={handlePasswordReset}>
        <Box>
          <Heading>Reset Password</Heading>
        </Box>
        <FormControl>
          <Text fontFamily="Inter" mt="24px">
            Enter the email associated with your account and we’ll send
            instructions to reset your password.
          </Text>
          <FormLabel mt="24px" fontWeight="700" fontSize="16px">
            Email address
          </FormLabel>
          <Input type="email" onChange={(e) => setEmail(e.target.value)} />
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
            Send Instructions
          </Button>
        </FormControl>
      </Box>
    </IsValidTokenWrapper>
  );
};

export default ForgotPassword;
