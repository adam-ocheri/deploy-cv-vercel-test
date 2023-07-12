import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from '@chakra-ui/react';
import Button from '../Buttons';
import shortid from 'shortid';
import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '@/redux/profileSlice';

interface DetailsProps {
  item?: Contact;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
  onChange?: (newContact: Contact) => void;
  contact?: Contact;
}

const Details: React.FC<DetailsProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
  contact,
  onChange,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const initialState: Contact = {
    fullName: item?.fullName || '',
    location: item?.location || '',
    phoneNumber: item?.phoneNumber || '',
    email: item?.email || '',
    id: item?.id || shortid.generate(),
  };

  const [contactData, setContactData] = useState<Contact>(
    contact || item || initialState
  );
  const [isUpdating, setIsUpdating] = useState(false);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newContact = {
      ...contactData,
      [event.target.name]: event.target.value,
    };
    setContactData(newContact);

    if (onChange) {
      onChange(newContact);
    }
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    dispatch({ type: 'profile/updateContact', payload: contactData });
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
        Contact
      </Heading>
      <FormControl id='fullName'>
        <FormLabel>Full Name</FormLabel>
        <Input
          type='text'
          name='fullName'
          placeholder=''
          value={contactData.fullName || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id='location'>
        <FormLabel>Location</FormLabel>
        <Input
          type='text'
          name='location'
          value={contactData.location || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id='phoneNumber'>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type='text'
          name='phoneNumber'
          value={contactData.phoneNumber}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl id='email'>
        <FormLabel>Email</FormLabel>
        <Input
          type='text'
          name='email'
          placeholder=''
          value={contactData.email || ''}
          onChange={handleInputChange}
        />
      </FormControl>

      {item && (
        <Button block onClick={handleUpdate}>
          UPDATE
        </Button>
      )}
    </Flex>
  );
};

export default Details;
