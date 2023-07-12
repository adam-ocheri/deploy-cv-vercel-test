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

interface RecommendationProps {
  item?: Recommendation;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

export const RecommendationForm: React.FC<RecommendationProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { recommendations } = useSelector((state: RootState) => state.profile);

  const initialState: Recommendation = {
    recommenderName: item?.recommenderName || '',
    relationship: item?.relationship || '',
    recommendationText: item?.recommendationText || '',
    id: item?.id || shortid.generate(),
  };

  const [recommendation, setRecommendation] = useState<Recommendation>(
    item || initialState
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRecommendation = {
      ...recommendation,
      [event.target.name]: event.target.value,
    };
    setRecommendation(newRecommendation);
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    dispatch({
      type: 'profile/addRecommendation',
      payload: recommendation,
    });
    setRecommendation(initialState);
    setIsUpdating(true);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/updateRecommendation', payload: recommendation });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch({ type: 'profile/deleteRecommendation', payload: recommendation });
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
        <FormLabel>Recommender Name</FormLabel>
        <Input
          type='text'
          name='recommenderName'
          placeholder='Recommender Name'
          value={recommendation.recommenderName || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Relationship</FormLabel>
        <Input
          type='text'
          name='relationship'
          placeholder='Relationship'
          value={recommendation.relationship || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Recommendation Text</FormLabel>
        <Input
          type='text'
          name='recommendationText'
          placeholder='Recommendation Text'
          value={recommendation.recommendationText || ''}
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
