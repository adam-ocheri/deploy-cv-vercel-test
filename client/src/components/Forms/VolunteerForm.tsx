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
import shortid from 'shortid';
import { GoPlus } from 'react-icons/go';
import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '@/redux/profileSlice';

interface VolunteerProps {
  item?: Volunteer;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

export const VolunteerForm: React.FC<VolunteerProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { volunteer } = useSelector((state: RootState) => state.profile);

  const initialState: Volunteer = {
    organization: item?.organization || '',
    role: item?.role || '',
    startDate: item?.startDate || new Date().toISOString().slice(0, 10),
    endDate: item?.endDate || new Date().toISOString().slice(0, 10),
    location: item?.location || '',
    description: item?.description || '',
    id: item?.id || shortid.generate(),
  };

  const [volunteerData, setVolunteerData] = useState<Volunteer>(
    item || initialState
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolunteer = {
      ...volunteerData,
      [event.target.name]: event.target.value,
    };
    setVolunteerData(newVolunteer);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/addVolunteer', payload: volunteerData });
    setVolunteerData(initialState);
    setIsUpdating(true);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/updateVolunteer', payload: volunteerData });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/deleteVolunteer', payload: volunteerData });
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
        <FormLabel>Organization</FormLabel>
        <Input
          type='text'
          name='organization'
          placeholder='Organization'
          value={volunteerData.organization || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Role</FormLabel>
        <Input
          type='text'
          name='role'
          placeholder='Role'
          value={volunteerData.role || ''}
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
            value={volunteerData.startDate}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input
            type='date'
            name='endDate'
            placeholder='End Date'
            value={volunteerData.endDate}
            onChange={handleInputChange}
          />
        </FormControl>
      </Flex>
      <FormControl>
        <FormLabel>Location</FormLabel>
        <Input
          type='text'
          name='location'
          placeholder='Location'
          value={volunteerData.location || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input
          type='text'
          name='description'
          placeholder='Description'
          value={volunteerData.description || ''}
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
