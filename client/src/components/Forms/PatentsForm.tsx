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

interface PatentProps {
  item?: Patent;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

export const PatentsForm: React.FC<PatentProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { patents } = useSelector((state: RootState) => state.profile);

  const initialState: Patent = {
    title: item?.title || '',
    patentOffice: item?.patentOffice || '',
    issueDate: item?.issueDate || new Date().toISOString().slice(0, 10),
    description: item?.description || '',
    id: item?.id || shortid.generate(),
  };

  const [patent, setPatent] = useState<Patent>(item || initialState);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPatent = {
      ...patent,
      [event.target.name]: event.target.value,
    };
    setPatent(newPatent);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/addPatent', payload: patent });
    setPatent(initialState);
    setIsUpdating(true);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/updatePatent', payload: patent });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/deletePatent', payload: patent });
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
        <FormLabel>Patent Title</FormLabel>
        <Input
          type='text'
          name='title'
          placeholder='Patent Title'
          value={patent.title || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Patent Office</FormLabel>
        <Input
          type='text'
          name='patentOffice'
          placeholder='Patent Office'
          value={patent.patentOffice || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Issue Date</FormLabel>
        <Input
          type='date'
          name='issueDate'
          placeholder='Issue Date'
          value={patent.issueDate}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          type='text'
          name='description'
          placeholder='Description'
          value={patent.description || ''}
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
