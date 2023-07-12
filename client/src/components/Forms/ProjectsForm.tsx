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

interface ProjectProps {
  item?: Project;
  closeModal?: () => void;
  itemId?: string;
  editItem?: (itemName: string, id: string, item: any) => void;
}

export const ProjectsForm: React.FC<ProjectProps> = ({
  item,
  closeModal,
  itemId,
  editItem,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { projects } = useSelector((state: RootState) => state.profile);

  const initialState: Project = {
    name: item?.name || '',
    description: item?.description || '',
    teamMembers: item?.teamMembers || [],
    startDate: item?.startDate || new Date().toISOString().slice(0, 10),
    endDate: item?.endDate || new Date().toISOString().slice(0, 10),
    id: item?.id || shortid.generate(),
  };

  const [project, setProject] = useState<Project>(item || initialState);
  const [newTeamMembers, setNewTeamMembers] = useState<string>('');
  const [team, setTeam] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProject = {
      ...project,
      [event.target.name]: event.target.value,
    };
    setProject(newProject);
  };

  const handleTeamSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setTeam((prevTeam) =>
      [...prevTeam, newTeamMembers].filter((member) => member !== '')
    );
    console.log(team);
    setNewTeamMembers('');
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newProject = {
      ...project,
      teamMembers: team,
    };

    dispatch({ type: 'profile/addProject', payload: newProject });
    setProject(initialState);
    setIsUpdating(true);
  };

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newProject = {
      ...project,
      teamMembers: team,
    };

    dispatch({ type: 'profile/updateProject', payload: newProject });
    setIsUpdating(true);
    if (closeModal) closeModal();
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newProject = {
      ...project,
      teamMembers: team,
    };

    dispatch({ type: 'profile/deleteProject', payload: newProject });
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
        <FormLabel>Project Name</FormLabel>
        <Input
          type='text'
          name='name'
          placeholder='Project Name'
          value={project.name || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Project Description</FormLabel>
        <Input
          type='text'
          name='description'
          placeholder='Project Description'
          value={project.description || ''}
          onChange={handleInputChange}
        />
      </FormControl>
      {/* <FormControl>
            <FormLabel>Team Members</FormLabel>
            // Todo: plus button for teamMembers
            <Input
              type='text'
              name='teamMembers'
              placeholder='Team Members'
              value={newTeamMembers || ''}
              onChange={(event) => setNewTeamMembers(event.target.value)}
            />
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

// export default ProjectsForm;
