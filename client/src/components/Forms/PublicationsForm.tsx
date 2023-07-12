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

interface PublicationProps {
  item?: Publication;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

export const PublicationsForm: React.FC<PublicationProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { publications } = useSelector((state: RootState) => state.profile);

  const initialState: Publication = {
    title: item?.title || '',
    publisher: item?.publisher || '',
    publicationDate:
      item?.publicationDate || new Date().toISOString().slice(0, 10),
    description: item?.description || '',
    id: item?.id || shortid.generate(),
  };

  const [publicationsData, setPublicationsData] = useState<Publication>(
    item || initialState
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPublication = {
      ...publicationsData,
      [event.target.name]: event.target.value,
    };
    setPublicationsData(newPublication);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/addPublication', payload: publicationsData });
    setPublicationsData(initialState);
    setIsUpdating(true);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/updatePublication', payload: publicationsData });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/deletePublication', payload: publicationsData });
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
        <FormLabel>Publication Title</FormLabel>
        <Input
          type='text'
          name='title'
          placeholder='Publication Title'
          value={publicationsData.title || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Publisher</FormLabel>
        <Input
          type='text'
          name='publisher'
          placeholder='Publisher'
          value={publicationsData.publisher || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Publication Date</FormLabel>
        <Input
          type='date'
          name='publicationDate'
          placeholder='Publication Date'
          value={publicationsData.publicationDate}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          type='text'
          name='description'
          placeholder='Description'
          value={publicationsData.description || ''}
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
