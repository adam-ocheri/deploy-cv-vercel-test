import React, { useState } from "react";
import {
  Box,
  Flex,
  FormLabel,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
  FormControl,
  Icon,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import Button from "@/components/Buttons";
import { RootState, AppDispatch } from "@/redux/store";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { pages } from "@/constants/router";
import axios from "axios";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { updateJob, updateUserProfile } from "@/redux/profileSlice";

const Description = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const ceevee_id = useSelector((state: RootState) => state.auth.user);
  const [inputValue, setInputValue] = useState("• ");
  const [isLoading, setIsLoading] = useState(false);
  const [ceeveeResponse, setCeeveeResponse] = useState("");
  const router = useRouter();

  const dispatch: AppDispatch = useDispatch();

  const jobId = router.query.jobId as string;
  const job = profile.jobs.find((job: { id: string }) => job.id === jobId);
  const companyName = job ? job.company : "";

  const handleGoBackProfile = () => {
    router.push(pages.profileUser);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setInputValue(`${inputValue}\n• `);
    }
  };

  const handleUpdate = async () => {
    const updatedJob = {
      ...job!,
      description: ceeveeResponse,
    };

    const updatedJobs = profile.jobs.map((job) =>
      job.id === jobId ? updatedJob : job
    );
    console.log(jobId);
    console.log("updated Job", updatedJob);
    dispatch(updateUserProfile({ ...profile, jobs: updatedJobs }));
    router.push(pages.profileUser);
  };

  const SERVER_URI = "http://localhost:4000";

  const handleCeeveeIt = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const prompt = `
      Taken the input value after each •,  and can you enhance and improve this description, in relation to this job position, and return bullet points: ${job?.jobTitle} with the company ${job?.company}?
      ${inputValue}
    `;

    const res = await axios.post(
      `${SERVER_URI}/api/profile/description`,
      { prompt: prompt },
      { headers: { "Content-Type": "application/json" } }
    );
    setCeeveeResponse(res.data.feedback);
    setIsLoading(false);
  };

  return (
    <Flex
      h='full'
      flexDir='column'
      alignItems='flex-start'
      gap={4}
      overflowY={"auto"}
      mr={2}
    >
      <Button onClick={handleGoBackProfile} variant='tertiary'>
        <Icon as={ArrowBackIcon} boxSize={6} />
        Back to profile
      </Button>
      <FormControl flexGrow={1} display='flex' flexDir='column'>
        <FormLabel
          fontWeight='700'
          fontSize='16px'
          lineHeight='19px'
        >{`Describe your time at ${companyName}`}</FormLabel>
        {!isLoading ? (
          <Textarea
            flexGrow={1}
            fontWeight='400'
            fontSize='16px'
            lineHeight='19px'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='• '
            rows={8}
          />
        ) : (
          <LoadingSpinner />
        )}
      </FormControl>
      <Flex justifyContent='space-between' w='full'>
        <Button variant='secondary' onClick={handleUpdate} type='submit'>
          Save and close
        </Button>
        <Button variant='action' onClick={handleCeeveeIt} type='submit'>
          CeeVee it!
        </Button>
      </Flex>
      <Box as='section' w='full'>
        <Text fontWeight='700' fontSize='16px' lineHeight='19px' mb={2}>
          Preview your description
        </Text>
        <UnorderedList styleType='none' mx={0}>
          {" "}
          {ceeveeResponse.split("\n").map((bullet: string, index: number) => (
            <ListItem key={index}>{bullet}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Flex>
  );
};

export default Description;
