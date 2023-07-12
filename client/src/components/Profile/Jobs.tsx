import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from '@chakra-ui/react';
import Button from '../Buttons';
import { GoPlus } from 'react-icons/go';
import shortid from 'shortid';

import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '@/redux/profileSlice';


interface WorkExperienceProps {
  item?: Jobs;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { jobs } = useSelector((state: RootState) => state.profile);

  const initialState: Jobs = {
    jobTitle: item?.jobTitle || '',
    startDate: item?.startDate || new Date().toISOString().slice(0, 10),
    endDate: item?.endDate || new Date().toISOString().slice(0, 10),
    company: item?.company || '',
    location: item?.location || '',
    id: item?.id || shortid.generate(),
    description: item?.description || '',
  };
  
  const [job, setJob] = useState<Jobs>(item || initialState);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newJob = {
      ...job,
      [event.target.name]: event.target.value,
    };
    setJob(newJob);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/addJob', payload: job });
    setJob(initialState);
    setIsUpdating(true);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/updateJob', payload: job });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };
  
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/deleteJob', payload: job });
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
        Jobs
      </Heading>
      <FormControl>
        <FormLabel>job Title</FormLabel>
        <Input
          type='text'
          name='jobTitle'
          placeholder='job Title'
          value={job.jobTitle || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <Flex
        flexDirection={['column', 'row']}
        justifyContent='space-between'
        w='full'
        gap={4}
      >
        <FormControl>
          <FormLabel>Start Date</FormLabel>
          <Input
            type='date'
            name='startDate'
            placeholder='Start Date'
            value={job.startDate}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input
            type='date'
            name='endDate'
            placeholder='End Date'
            value={job.endDate}
            onChange={handleInputChange}
          />
        </FormControl>
      </Flex>
      <FormControl>
        <FormLabel>Company</FormLabel>
        <Input
          type='text'
          name='company'
          placeholder='Company'
          value={job.company || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Location</FormLabel>
        <Input
          type='text'
          name='location'
          placeholder='Location'
          value={job.location || ''}
          onChange={handleInputChange}
        />
      </FormControl>

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

export default WorkExperience;
