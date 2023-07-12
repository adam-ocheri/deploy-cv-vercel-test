import React, { useState, useEffect } from 'react';
import { Heading, FormControl, FormLabel, Input, Flex } from '@chakra-ui/react';
import Button from '../Buttons';
import { RootState, AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { GoPlus } from 'react-icons/go';
import shortid from 'shortid';
import { updateUserProfile } from '@/redux/profileSlice';


interface SkillsProps {
  item?: Skills;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

export const Skills: React.FC<SkillsProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { skills } = useSelector((state: RootState) => state.profile);


  const initialState = {
    name: item?.name || '',
    endorsements: item?.endorsements || 0,
    id: item?.id || shortid.generate(),
  };

  const [skillsData, setSkillsData] = useState<Skills>(item || initialState);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSkill = {
      ...skillsData,
      [event.target.name]: event.target.value,
    };
    setSkillsData(newSkill);
  };

  const handleEndorsmentChange = (value: string) => {
    const newSkill = {
      ...skillsData,
      endorsements: parseInt(value),
    };
    setSkillsData(newSkill);
  };

  const handleSave = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (skillsData.name !== '') {
      event.preventDefault();
      dispatch({ type: 'profile/addSkill', payload: skillsData });
      setSkillsData(initialState);
      setIsUpdating(true);
    }
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/updateSkill', payload: skillsData });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/deleteSkill', payload: skillsData });
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
        Skills
      </Heading>
      <FormControl>
        <FormLabel>Skill</FormLabel>
        <Input
          type='text'
          name='name'
          placeholder='Skill'
          value={skillsData.name || ''}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSave(e);
            }
          }}
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

export default Skills;
