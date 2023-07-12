import React, { useState, useEffect } from 'react';
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

interface CertificationProps {
  item?: Certification;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

export const CertForm: React.FC<CertificationProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {  
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { certs } = useSelector((state: RootState) => state.profile);

  const initialState: Certification = {
    name: item?.name || '',
    authority: item?.authority || '',
    licenseNumber: item?.licenseNumber || '',
    startDate: item?.startDate || new Date().toISOString().slice(0, 10),
    endDate: item?.endDate || new Date().toISOString().slice(0, 10),
    id: item?.id || shortid.generate(),
  };

  const [certData, setCertData] = useState<Certification>(item || initialState);
  const [isUpdating, setIsUpdating] = useState(false);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCert = {
      ...certData,
      [event.target.name]: event.target.value,
    };
    setCertData(newCert);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/addCertificate', payload: certData });
    setCertData(initialState);
    setIsUpdating(true);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/updateCertificate', payload: certData });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/deleteCertificate', payload: certData });
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
        <FormLabel>Certification Name</FormLabel>
        <Input
          type='text'
          name='name'
          placeholder='Certification Name'
          value={certData.name || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Authority</FormLabel>
        <Input
          type='text'
          name='authority'
          placeholder='Authority'
          value={certData.authority || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>License Number</FormLabel>
        <Input
          type='text'
          name='licenseNumber'
          placeholder='License Number'
          value={certData.licenseNumber || ''}
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
            value={certData.startDate}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Date</FormLabel>
          <Input
            type='date'
            name='endDate'
            placeholder='End Date'
            value={certData.endDate}
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
