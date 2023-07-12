import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { pages } from "@/constants/router";
import { getMe, reset, resetStatus } from "@/redux/auth/authSlice";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { LoadingSpinner } from "../LoadingSpinner";
import useErrorToast from "@/hooks/useErrorToast";

// This component is used to protect pages that require authentication.
// checks if there is a token in the local storage.
// If there is a token, it is verified.
// if not the user is redirected to the login page.
function AuthWrapper({ children }: any) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const currentRoute = router.pathname;

  const { token, isError, isLoading, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const verifyLocalStorageToken = async () => {
      const localStorageToken = localStorage.getItem("token");
      if (!token && localStorageToken) {
        dispatch(getMe({ token: localStorageToken }) as any);
      }
    };
    verifyLocalStorageToken();
  }, [dispatch, token]);

  useEffect(() => {
    if (!token && !localStorage.getItem("token")) {
      dispatch(reset());
      router.push(pages.auth.login);
    }
  }, [isError, currentRoute, dispatch, router, token]);

  useErrorToast();

  if (token) {
    return <>{children}</>;
  }
  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <LoadingSpinner />
    </>
  );
}

export default AuthWrapper;
