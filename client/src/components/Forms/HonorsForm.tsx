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

interface HonorsProps {
  item?: Honors;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

export const HonorsForm: React.FC<HonorsProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { honors } = useSelector((state: RootState) => state.profile);

  const initialState: Honors = {
    title: item?.title || '',
    issuer: item?.issuer || '',
    issueDate: item?.issueDate || new Date().toISOString().slice(0, 10),
    description: item?.description || '',
    id: item?.id || shortid.generate(),
  };

  const [honor, setHonor] = useState<Honors>(item || initialState);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHonor = {
      ...honor,
      [event.target.name]: event.target.value,
    };
    setHonor(newHonor);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/addHonor', payload: honor });
    setHonor(initialState);
    setIsUpdating(true);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/updateHonor', payload: honor });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/deleteHonor', payload: honor });
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
      {' '}
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          type='text'
          name='title'
          placeholder='Title'
          value={honor.title || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Issuer</FormLabel>
        <Input
          type='text'
          name='issuer'
          placeholder='Issuer'
          value={honor.issuer || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Issue Date</FormLabel>
        <Input
          type='date'
          name='issueDate'
          placeholder='Issue Date'
          value={honor.issueDate}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          type='text'
          name='description'
          placeholder='Description'
          value={honor.description || ''}
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
