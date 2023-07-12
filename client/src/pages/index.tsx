/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import Button from "@/components/Buttons";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";
import LandingPage from "@/components/LandingPage";
import { pages } from "@/constants/router";
import { Head } from "@/components/layout/Head";
import IsValidTokenWrapper from "@/components/auth/IsValidTokenWrapper";

export default function Home() {
  // Call the custume hook to fetch user data
  // useFetchUser();
  const router = useRouter();

  const isMobile = useIsMobile();

  return (
    <>
      <IsValidTokenWrapper>
        <Head
          title="CeeVee App"
          description="Empower Your Career Journey with CeeVee"
        />

        <Flex direction="column" alignItems="center" justifyContent="center">
          <LandingPage />
          <Button
            variant="action"
            type="button"
            onClick={() => router.push(pages.profile.create)}
          >
            Create Your Perfect CV
          </Button>
        </Flex>
      </IsValidTokenWrapper>
    </>
  );
}
