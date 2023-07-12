import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { reset, resetStatus } from "@/redux/auth/authSlice";

const useErrorToast = (isReset: boolean = false) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const { isError, message } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: `${message}`,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      if (isReset) {
        dispatch(reset());
        return;
      }
      dispatch(resetStatus());
    }
  }, [isError, message, toast, dispatch, isReset]);
};

export default useErrorToast;
