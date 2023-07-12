import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from '@chakra-ui/react';
import Button from '../Buttons';
import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { GoPlus } from 'react-icons/go';
import shortid from 'shortid';
import { updateUserProfile } from '@/redux/profileSlice';


interface EducationProps {
  item?: Education;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

const Education: React.FC<EducationProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {
  
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { education } = useSelector((state: RootState) => state.profile);

  const initialSate = {
    institution: item?.institution || '',
    degree: item?.degree || '',
    fieldOfStudy: item?.fieldOfStudy || '',
    startDate: item?.startDate || new Date().toISOString().slice(0, 10),
    endDate: item?.endDate || new Date().toISOString().slice(0, 10),
    id: item?.id || shortid.generate(),
  };

  const [educationData, setEducationData] = useState<Education>(item || initialSate);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEducation = {
      ...educationData,
      [event.target.name]: event.target.value,
    };
    setEducationData(newEducation);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/addEducation', payload: educationData });
    setEducationData(initialSate);
    setIsUpdating(true);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/updateEducation', payload: educationData });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/deleteEducation', payload: educationData });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  useEffect(() => {    
    if (isUpdating) {
      dispatch(updateUserProfile(profile));
      setIsUpdating(false);
    }
  }, [profile, dispatch, isUpdating]);

  return (
    <Flex
      as='form'
      flexDir='column'
      align='flex-start'
      mx={item ? 0 : 2}
      gap={4}
    >
      <Heading display={['initial', 'none']} size='md'>
        Education
      </Heading>
      <FormControl>
        <FormLabel>Institution</FormLabel>
        <Input
          type='text'
          name='institution'
          placeholder='Institution'
          value={educationData.institution || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Degree</FormLabel>
        <Input
          type='text'
          name='degree'
          placeholder='Degree'
          value={educationData.degree || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Field of Study</FormLabel>
        <Input
          type='text'
          name='fieldOfStudy'
          placeholder='Field of Study'
          value={educationData.fieldOfStudy || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <Flex w='full' flexDirection={['column', 'row']} gap={4}>
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input
            type='date'
            name='startDate'
            placeholder='Start Date'
            value={educationData.startDate}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input
            type='date'
            name='endDate'
            placeholder='End Date'
            value={educationData.endDate}
            onChange={handleInputChange}
          />
        </FormControl>
      </Flex>
      {item ? (
        <Flex w='full' justifyContent='space-between' gap={2}>
          <Button block onClick={handleUpdate}>
            UPDATE
          </Button>
          <Button block variant='secondary' onClick={handleDelete}>
            DELETE
          </Button>
        </Flex>
      ) : (
        <Button onClick={handleSave}>
          <GoPlus />
          ADD
        </Button>
      )}
    </Flex>
  );
};

export default Education;
