import React, { Component, useEffect } from 'react';
import { RootState } from '@/redux/store';
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  UnorderedList,
  ListItem,
  AccordionIcon,
} from '@chakra-ui/react';
import Button from '../../components/Buttons';
import { useSelector } from 'react-redux';
import { ProfileDrawer } from '@/components/Profile/ProfileDrawer';
import { useRouter } from 'next/router';
import { pages } from '@/constants/router';
import { ArrowBackIcon } from '@chakra-ui/icons';

interface ProfileProps {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  option: string;
  itemId: string;
  setItemId: (id: string) => void;
}

const Profile: React.FC<ProfileProps> = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const { user } = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  // variables
  const profileForms = Object.keys(profile);

  // Format Helper
  const formatYears = (startDate: string, endDate: string) => {
    const startYear = new Date(startDate).getFullYear();
    const endYear = endDate ? new Date(endDate).getFullYear() : 'Present';
    return `${startYear}-${endYear}`;
  };

  const handleCeeveeit = (jobId: string) => {
    router.push({
      pathname: pages.profile.description,
      query: { jobId: jobId },
    });
  };

  useEffect(() => {
    if (!user) {
      router.push(pages.home);
    }
  }, [router, user]);

  const handleInterviewClick = () => {
    router.push(pages.interviews.practice);
  };

  const renderedData = () => {
    return (
      <Flex flexDir='column' mr={2}>
        {profileForms.map((itemKey) => {
          if (itemKey === '_id' || itemKey === 'userId') {
            return null;
          }
          if (profile[itemKey]?.length > 0) {
            return (
              <Flex
                key={itemKey}
                flexDirection='column'
                p={0}
                mb='40px'
                gap='20px'
              >
                <Text
                  textTransform='capitalize'
                  fontWeight='500'
                  fontSize='24px'
                  lineHeight='29px'
                  fontStyle='medium'
                  textDecorationLine='underline'
                  textUnderlineOffset={7}
                >
                  {itemKey}
                </Text>

                <Flex
                  flexDir={itemKey === 'skills' ? 'row' : 'column'}
                  gap={2}
                  flexWrap='wrap'
                >
                  {Array.isArray(profile[itemKey]) &&
                    profile[itemKey].map((detail: any, idx: number) => (
                      <Box key={idx}>
                        {/* CASE CONTACT */}
                        {itemKey === 'contact' && (
                          <Flex direction='column' gap='10px'>
                            <Text
                              fontWeight='700'
                              fontSize='14px'
                              lineHeight='17px'
                            >{`${detail.fullName} | ${detail.location}`}</Text>
                            <Text
                              fontWeight='400'
                              fontStyle='italic'
                              fontSize='14px'
                              lineHeight='17px'
                            >{`${detail.phoneNumber} | ${detail.email}`}</Text>
                          </Flex>
                        )}
                        {/* CASE JOBS */}
                        {itemKey === 'jobs' && (
                          <>
                            <Flex justifyContent='space-between'>
                              <Flex direction='column' gap='10px'>
                                <Text
                                  textTransform='capitalize'
                                  fontWeight='700'
                                  fontSize='14px'
                                  lineHeight='17px'
                                >
                                  {detail.jobTitle}
                                </Text>
                                <Text
                                  fontWeight='400'
                                  fontStyle='italic'
                                  fontSize='14px'
                                  lineHeight='17px'
                                >{`${detail.company} | ${formatYears(
                                  detail.startDate,
                                  detail.endDate
                                )}`}</Text>
                              </Flex>
                              <Button
                                variant='action'
                                onClick={() => handleCeeveeit(detail.id)}
                              >
                                CeeVee it!
                              </Button>
                            </Flex>
                            <Accordion allowToggle>
                              <AccordionItem>
                                <h2>
                                  <AccordionButton>
                                    <Box as='span' flex='1' textAlign='left'>
                                      Description
                                    </Box>
                                    <AccordionIcon />
                                  </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                  <UnorderedList styleType='none' mx={0}>
                                    {' '}
                                    {detail.description
                                      .split('\n')
                                      .map((bullet: string, index: number) => (
                                        <ListItem key={index}>
                                          {bullet}
                                        </ListItem>
                                      ))}
                                  </UnorderedList>
                                </AccordionPanel>
                              </AccordionItem>
                            </Accordion>
                          </>
                        )}
                        {/* CASE EDUCATION */}
                        {itemKey === 'education' && (
                          <Flex justifyContent='space-between'>
                            <Flex direction='column' gap='10px'>
                              <Text
                                textTransform='capitalize'
                                fontWeight='700'
                                fontSize='14px'
                                lineHeight='17px'
                              >
                                {detail.institution}
                              </Text>
                              <Text
                                textTransform='uppercase'
                                fontWeight='400'
                                fontStyle='italic'
                                fontSize='14px'
                                lineHeight='17px'
                              >{`${detail.degree} | ${formatYears(
                                detail.startDate,
                                detail.endDate
                              )}`}</Text>
                            </Flex>
                          </Flex>
                        )}
                        {/* CASE SKILLS */}
                        {itemKey === 'skills' && (
                          <>
                            <Text
                              fontWeight='400'
                              fontSize='14px'
                              lineHeight='17px'
                            >{`${detail.name}${
                              idx !== profile[itemKey].length - 1 ? ' | ' : ''
                            }`}</Text>
                          </>
                        )}
                        {/* CASE Volunteer */}
                        {itemKey === 'volunteer' && (
                          <Flex alignItems='center'>
                            <Flex direction='column' gap='10px'>
                              <Text
                                textTransform='capitalize'
                                fontWeight='700'
                                fontSize='14px'
                                lineHeight='17px'
                              >
                                {detail.organization}
                              </Text>
                              <Text
                                fontWeight='400'
                                fontStyle='italic'
                                fontSize='14px'
                                lineHeight='17px'
                                textTransform='capitalize'
                              >{`${detail.role} | ${formatYears(
                                detail.startDate,
                                detail.endDate
                              )}`}</Text>
                            </Flex>
                          </Flex>
                        )}
                        {/* CASE Certification */}
                        {itemKey === 'certifications' && (
                          <Flex alignItems='center'>
                            <Flex direction='column' gap='10px'>
                              <Text
                                textTransform='capitalize'
                                fontWeight='700'
                                fontSize='14px'
                                lineHeight='17px'
                              >
                                {detail.name}
                              </Text>
                              <Text
                                fontWeight='400'
                                fontStyle='italic'
                                fontSize='14px'
                                lineHeight='17px'
                                textTransform='capitalize'
                              >{`${detail.authority} | ${formatYears(
                                detail.startDate,
                                detail.endDate
                              )}`}</Text>
                            </Flex>
                          </Flex>
                        )}
                        {/* CASE Courses */}
                        {itemKey === 'courses' && (
                          <Flex alignItems='center'>
                            <Flex direction='column' gap='10px'>
                              <Text
                                textTransform='capitalize'
                                fontWeight='700'
                                fontSize='14px'
                                lineHeight='17px'
                              >
                                {detail.name}
                              </Text>
                              <Text
                                fontWeight='400'
                                fontStyle='italic'
                                fontSize='14px'
                                lineHeight='17px'
                              >
                                {detail.completionDate}
                              </Text>
                            </Flex>
                          </Flex>
                        )}
                        {/* CASE Honors */}
                        {itemKey === 'honorsAwards' && (
                          <Flex alignItems='center'>
                            <Flex direction='column' gap='10px'>
                              <Text
                                textTransform='capitalize'
                                fontWeight='700'
                                fontSize='14px'
                                lineHeight='17px'
                              >
                                {detail.title}
                              </Text>
                              <Text
                                fontWeight='400'
                                fontStyle='italic'
                                fontSize='14px'
                                lineHeight='17px'
                                textTransform='capitalize'
                              >{`${detail.issuer} | ${detail.issueDate}`}</Text>
                            </Flex>
                          </Flex>
                        )}
                        {/* CASE Language */}
                        {itemKey === 'languages' && (
                          <Flex alignItems='center'>
                            <Text
                              textTransform='capitalize'
                              fontWeight='700'
                              fontSize='14px'
                              lineHeight='17px'
                            >{`${detail.name} - `}</Text>
                            <Text
                              textTransform='capitalize'
                              fontWeight='400'
                              fontStyle='italic'
                              fontSize='14px'
                              lineHeight='17px'
                            >
                              {detail.proficiencyLevel}
                            </Text>
                          </Flex>
                        )}
                        {/* CASE Project */}
                        {itemKey === 'projects' && (
                          <>
                            <Text
                              textTransform='capitalize'
                              fontWeight='semibold'
                            >
                              {detail.name}
                            </Text>
                            {detail.description && (
                              <Text fontStyle='italic'>
                                {detail.description}
                              </Text>
                            )}
                          </>
                        )}
                        {/* CASE Publication */}
                        {itemKey === 'publications' && (
                          <Flex alignItems='center'>
                            <Flex direction='column' gap='10px'>
                              <Text
                                textTransform='capitalize'
                                fontWeight='700'
                                fontSize='14px'
                                lineHeight='17px'
                              >
                                {detail.title}
                              </Text>
                              <Text
                                fontWeight='400'
                                fontStyle='italic'
                                fontSize='14px'
                                lineHeight='17px'
                                textTransform='capitalize'
                              >{`${detail.publisher} | ${detail.publicationDate}`}</Text>
                            </Flex>
                          </Flex>
                        )}
                        {/* CASE Patent */}
                        {itemKey === 'patents' && (
                          <Flex alignItems='center'>
                            <Flex direction='column' gap='10px'>
                              <Text
                                textTransform='capitalize'
                                fontWeight='700'
                                fontSize='14px'
                                lineHeight='17px'
                              >
                                {detail.title}
                              </Text>
                              <Text
                                textTransform='capitalize'
                                fontWeight='400'
                                fontStyle='italic'
                                fontSize='14px'
                                lineHeight='17px'
                              >{`${detail.patentOffice} | ${detail.issueDate}`}</Text>
                            </Flex>
                          </Flex>
                        )}
                        {/* CASE Recommendation */}
                        {itemKey === 'recommendations' && (
                          <Flex alignItems='center'>
                            <Text
                              textTransform='capitalize'
                              fontWeight='700'
                              fontSize='14px'
                              lineHeight='17px'
                            >
                              {`${detail.recommenderName} -`}
                            </Text>
                            <Text
                              textTransform='capitalize'
                              fontWeight='400'
                              fontStyle='italic'
                              fontSize='14px'
                              lineHeight='17px'
                            >
                              {detail.relationship}
                            </Text>
                          </Flex>
                        )}
                      </Box>
                    ))}
                </Flex>
              </Flex>
            );
          }
        })}
      </Flex>
    );
  };

  return user ? (
    <Box h='full' overflowY='auto'>
      <Button
        variant='tertiary'
        onClick={() => router.push(pages.profile.create)}
      >
        <Icon
          as={ArrowBackIcon}
          boxSize={5}
          onClick={() => router.push(pages.profile.create)}
          cursor={'pointer'}
        />
        edit your profile
      </Button>
      <Flex justifyContent='space-between' m={2}>
        <ProfileDrawer
          openModal={false}
          setOpenModal={function (isOpen: boolean): void {
            throw new Error('Can not open modal.');
          }}
          option={''}
          itemId={''}
          setItemId={function (id: string): void {
            throw new Error('Id is not set.');
          }}
          iconType='pencil'
        />

        <Button variant='primary' onClick={handleInterviewClick}>
          Practice interview
        </Button>
      </Flex>
      <Heading size='md' my={4} textTransform='capitalize'>
        {user?.username}&apos;s Profile
      </Heading>
      {renderedData()}
    </Box>
  ) : null;
};

export default Profile;
