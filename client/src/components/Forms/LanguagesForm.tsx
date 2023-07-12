import React, { useEffect, useState } from 'react';
import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Select,
} from '@chakra-ui/react';
import Button from '../Buttons';

import { GoPlus } from 'react-icons/go';
import shortid from 'shortid';
import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '@/redux/profileSlice';

interface LanguageProps {
  item?: Language;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

export const LanguagesForm: React.FC<LanguageProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { languages } = useSelector((state: RootState) => state.profile);

  const initialState: Language = {
    name: item?.name || '',
    proficiencyLevel: item?.proficiencyLevel || '',
    proficiency: item?.proficiency || 0,
    id: item?.id || shortid.generate(),
  };

  const [language, setLanguage] = useState<Language>(
    item || initialState
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const proficiencyLevels = [
    'Elementary proficiency',
    'Limited working proficiency',
    'Professional working proficiency',
    'Full professional proficiency',
    'Native or bilingual proficiency',
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = {
      ...language,
      [event.target.name]: event.target.value,
    };
    setLanguage(newLanguage);
  };

  const handleProficiencyChange = (value: string) => {
    const newLanguage = {
      ...language,
      proficiency: Number(value),
    };
    setLanguage(newLanguage);
  };

  const handleProficiencyLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = {
      ...language,
      proficiencyLevel: event.target.value,
    };
    setLanguage(newLanguage);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    dispatch({ type: 'profile/addLanguage', payload: language });
    setLanguage(initialState);
    setIsUpdating(true);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/updateLanguage', payload: language });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/deleteLanguage', payload: language });
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
        <FormLabel>Language Name</FormLabel>
        <Input
          type='text'
          name='name'
          placeholder='Language Name'
          value={language.name || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Proficiency Level</FormLabel>
        <Select
          name='proficiencyLevel'
          placeholder='Select Proficiency Level'
          value={language.proficiencyLevel || ''}
          onChange={handleProficiencyLevelChange}
        >
          {proficiencyLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>
      </FormControl>
      {/* <FormControl>
            <FormLabel>Proficiency</FormLabel>
            <NumberInput
              name='number'
              placeholder='Proficiency'
              value={language.proficiency}
              min={0}
              onChange={handleProficiencyChange}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl> */}
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
