import {
  Flex,
  Heading,
  Button,
  useColorMode,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import Head from "next/head";
import Image from "next/image";
import hero from "../../../../images/herologo.svg";
import defaultPic from "../../../../images/defaultavatar.png";

const Callback = () => {
  const router = useRouter();
  const { token, firstName, lastName, profilePicUrl } = router.query;
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const { toggleColorMode } = useColorMode();

  // add condition that set the user info only if he's logged in

  return (
    <>
      <Head>
        <title>CeeVee App</title>
        <meta
          name='description'
          content='Empower Your Career Journey with CeeVee'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Flex
        direction='column'
        alignItems='center'
        justifyContent='center'
        mt={6}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
          mb={10}
          gap={2}
        >
          <Image src={hero} alt='CeeVee Logo' width={32} height={32} />
          <Text>CeeVee</Text>
          <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
        </Flex>
        <Image
          src={profilePicUrl || defaultPic}
          alt='User Avatar'
          width={120}
          height={120}
          style={{ borderRadius: "50%" }}
          priority
          loading='eager'
        />

        <Heading as='h1' fontSize='2xl' textAlign='center'>
          {`${firstName} ${lastName}`}
        </Heading>
      </Flex>
    </>
  );
};

export default Callback;
