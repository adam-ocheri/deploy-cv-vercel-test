import {
  Flex,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  useDisclosure,
  Icon,
  Heading,
} from '@chakra-ui/react';
import Button from '../Buttons';
import { useState } from 'react';
// import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import ProfileModal from '../ProfileModal';
import { AiOutlineFileSearch, AiFillEdit } from 'react-icons/ai';
import theme from '@/styles/theme';
import { updateUserProfile } from '@/redux/profileSlice';

interface ProfileDrawerProps {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  option: string;
  itemId: string;
  setItemId: (id: string) => void;
  iconType: string;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({ iconType }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentForm, setCurrentForm] = useState('');
  const [itemId, setItemId] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const user = useSelector((state: RootState) => state.auth.user);

  const profileId = user?.profileId;

  // variables
  const profileForms = Object.keys(profile);

  const editItem = (itemName: string, id: string, item: any) => {
    // Todo: ask team if they want to keep drawer open or close it?
    // onClose();
    setOpenModal(true);
    setCurrentForm(itemName);
    setItemId(id);
  };

  // Format Helper
  const formatYears = (startDate: string, endDate: string) => {
    const startYear = new Date(startDate).getFullYear();
    const endYear = endDate ? new Date(endDate).getFullYear() : 'Present';
    return `${startYear}-${endYear}`;
  };

  return (
    <>
      <ProfileModal
        setOpenModal={setOpenModal}
        openModal={openModal}
        option={currentForm}
        itemId={itemId}
        editItem={editItem}
        item={profile[currentForm]?.find((item: any) => item.id === itemId)}
        key={itemId}
      />
      <Icon
        boxSize={10}
        cursor='pointer'
        onClick={onOpen}
        as={AiOutlineFileSearch}
      />
      <Drawer placement='left' onClose={onClose} isOpen={isOpen} size='sm'>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Heading as='h2' size='md' textTransform='capitalize'>
                {user?.username}&apos;s Profile
              </Heading>{' '}
            </DrawerHeader>

            <DrawerBody>
              {profileForms.map((itemKey) => {
                if (itemKey === '_id' || itemKey === 'userId') {
                  return null;
                }

                if (profile[itemKey]?.length > 0) {
                  return (
                    <Flex
                      my={6}
                      key={itemKey}
                      flexDirection='column'
                      alignItems='baseline'
                      gap={4}
                    >
                      {
                        <Heading
                          as='h3'
                          color='gray.600'
                          size='md'
                          textTransform='capitalize'
                          textDecoration='underline'
                          textUnderlineOffset='4px'
                          textDecorationThickness='2px'
                        >
                          {itemKey}
                        </Heading>
                      }

                      <Flex
                        flexDir={itemKey === 'skills' ? 'row' : 'column'}
                        flexWrap={itemKey === 'skills' ? 'wrap' : 'nowrap'}
                        gap={4}
                      >
                        {Array.isArray(profile[itemKey]) &&
                          profile[itemKey].map((detail: any, idx: number) => (
                            <Flex key={idx}>
                              {/* CASE CONTACT */}
                              {itemKey === 'contact' && (
                                <Flex gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Flex direction='column'>
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
                                </Flex>
                              )}
                              {/* CASE JOBS */}
                              {itemKey === 'jobs' && (
                                <Flex gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Flex direction='column'>
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
                                </Flex>
                              )}
                              {/* CASE EDUCATION */}
                              {itemKey === 'education' && (
                                <Flex gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Flex direction='column'>
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
                                <Flex
                                  gap={2}
                                  align='center'
                                  bg={theme.colors.menuListBG}
                                  p={1}
                                  rounded='md'
                                >
                                  <Icon
                                    boxSize={4}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Text>{detail.name}</Text>
                                </Flex>
                              )}
                              {/* CASE Volunteer */}
                              {itemKey === 'volunteer' && (
                                <Flex gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Flex direction='column'>
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
                                <Flex gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Flex direction='column'>
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
                                <Flex gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Flex direction='column'>
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
                                <Flex gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Flex direction='column'>
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
                                <Flex alignItems='center' gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Flex flexDir='column'>
                                    <Text
                                      textTransform='capitalize'
                                      fontWeight='700'
                                      fontSize='14px'
                                      lineHeight='17px'
                                    >
                                      {detail.name}
                                    </Text>
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
                                </Flex>
                              )}
                              {/* CASE Project */}
                              {itemKey === 'projects' && (
                                <Flex gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Text
                                    textTransform='capitalize'
                                    fontWeight='700'
                                    fontSize='14px'
                                    lineHeight='17px'
                                  >
                                    {detail.name}
                                  </Text>
                                </Flex>
                              )}
                              {/* CASE Publication */}
                              {itemKey === 'publications' && (
                                <Flex gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Flex direction='column'>
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
                                <Flex gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
                                  <Flex direction='column'>
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
                                <Flex gap={2}>
                                  <Icon
                                    boxSize={6}
                                    as={AiFillEdit}
                                    cursor='pointer'
                                    onClick={() =>
                                      editItem(itemKey, detail.id, detail)
                                    }
                                  />
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
                              {itemKey !== 'contact' &&
                                itemKey !== 'jobs' &&
                                itemKey !== 'education' &&
                                itemKey !== 'skills' &&
                                itemKey !== 'volunteer' &&
                                itemKey !== 'certifications' &&
                                itemKey !== 'courses' &&
                                itemKey !== 'honorsAwards' &&
                                itemKey !== 'languages' &&
                                itemKey !== 'projects' &&
                                itemKey !== 'publications' &&
                                itemKey !== 'patents' &&
                                itemKey !== 'recommendations' &&
                                Object.entries(detail)
                                  .filter(([key]) => key !== 'id')
                                  .map(([key, value], i) => (
                                    <Flex key={i} align='center'>
                                      {i === 0 && (
                                        <Icon
                                          boxSize={6}
                                          as={AiFillEdit}
                                          cursor='pointer'
                                          onClick={() =>
                                            editItem(itemKey, detail.id, detail)
                                          }
                                        />
                                      )}
                                      <Text
                                        fontWeight='400'
                                        fontSize='14px'
                                        lineHeight='17px'
                                      >
                                        {String(value)}
                                      </Text>
                                    </Flex>
                                  ))}
                            </Flex>
                          ))}
                      </Flex>
                    </Flex>
                  );
                }
              })}

              <Button
                block
                onClick={() => dispatch(updateUserProfile(profile))}
              >
                Save
              </Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
