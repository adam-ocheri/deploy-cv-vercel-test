import React, { useEffect, useState } from 'react';
import {
  Box,
  Stack,
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

interface CoursesProps {
  item?: Courses;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

export const CoursesForm: React.FC<CoursesProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { courses } = useSelector((state: RootState) => state.profile);

  const initialState: Courses = {
    name: item?.name || '',
    number: item?.number || '',
    provider: item?.provider || '',
    completionDate:
      item?.completionDate || new Date().toISOString().slice(0, 10),
    id: item?.id || shortid.generate(),
  };

  const [course, setCourse] = React.useState<Courses>(item || initialState);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCourse = {
      ...course,
      [event.target.name]: event.target.value,
    };
    setCourse(newCourse);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/addCourse', payload: course });
    setCourse(initialState);
    setIsUpdating(true);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/updateCourse', payload: course });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/deleteCourse', payload: course });
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
    <Flex as='form' flexDir='column' align='flex-start' gap={4}>
      <FormControl>
        <FormLabel>Course Name</FormLabel>
        <Input
          type='text'
          name='name'
          placeholder='Course Name'
          value={course.name || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Course Number</FormLabel>
        <Input
          type='text'
          name='number'
          placeholder='Course Number'
          value={course.number || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Provider</FormLabel>
        <Input
          type='text'
          name='provider'
          placeholder='Provider'
          value={course.provider || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Completion Date</FormLabel>
        <Input
          type='date'
          name='completionDate'
          placeholder='Completion Date'
          value={course.completionDate}
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
