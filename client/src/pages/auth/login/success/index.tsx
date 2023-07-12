// import { Flex, Heading } from "@chakra-ui/react";
// import { useRouter } from "next/router";
// import Image from "next/image";
// import defaultPic from "../../../../images/defaultavatar.png";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../../../redux/userSlice";
// import { useEffect } from "react";

// const Callback = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Fetch the query params
//     const { firstName, lastName, profilePicUrl, email } = router.query;

//     // Dispatch the setUser action
//     dispatch(
//       setUser({
//         email: email || "",
//         firstName: firstName || "",
//         lastName: lastName || "",
//         profilePicUrl: profilePicUrl || "",
//         token: "", // update this with your actual token
//         id: "", // update this with your actual id
//         isUserLoggedIn: true,
//       })
//     );
//   }, [router.query, dispatch]);

//   return (
//     <>
//       <Flex
//         direction='column'
//         alignItems='center'
//         justifyContent='center'
//         mt={6}
//       >
//         <Image
//           src={profilePicUrl || defaultPic}
//           alt='User Avatar'
//           width={120}
//           height={120}
//           style={{ borderRadius: "50%" }}
//           priority
//           loading='eager'
//         />

//         <Heading as='h1' fontSize='2xl' textAlign='center'>
//           {`${firstName} ${lastName}`}
//         </Heading>
//       </Flex>
//     </>
//   );
// };

// export default Callback;
