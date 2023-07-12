import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { pages } from "@/constants/router";
import { getMe, reset, resetStatus } from "@/redux/auth/authSlice";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { LoadingSpinner } from "../LoadingSpinner";
import useErrorToast from "@/hooks/useErrorToast";

// This component is used to prevent the user from accessing
// the auth pages if he is already logged in.
function IsValidTokenWrapper({ children }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const currentRoute = router.pathname;
  const { token, isLoading, isError, message, isSuccess } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const verifyLocalStorageToken = async () => {
      const localStorageToken = localStorage?.getItem("token");
      if (!token && localStorageToken) {
        dispatch(getMe({ token: localStorageToken }) as any);
      }
    };
    if (token && currentRoute !== pages.home) {
      router.push(pages.welcome);
      return;
    }
    verifyLocalStorageToken();
  }, [dispatch, router, currentRoute, token]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetStatus());
    }
  }, [isSuccess, dispatch]);

  useErrorToast(true);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}

export default IsValidTokenWrapper;
