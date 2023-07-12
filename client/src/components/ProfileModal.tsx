import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  CloseButton,
  Stack,
} from '@chakra-ui/react';

import Details from './Profile/Details';
import Jobs from './Profile/Jobs';
import Education from './Profile/Education';
import Skills from './Profile/Skills';
import { VolunteerForm } from '../components/Forms/VolunteerForm';
import { CertForm } from '../components/Forms/CertForm';
import { CoursesForm } from '../components/Forms/CoursesForm';
import { HonorsForm } from '../components/Forms/HonorsForm';
import { LanguagesForm } from '../components/Forms/LanguagesForm';
import { ProjectsForm } from '../components/Forms/ProjectsForm';
import { PublicationsForm } from './Forms/PublicationsForm';
import { PatentsForm } from '../components/Forms/PatentsForm';
import { RecommendationForm } from '../components/Forms/RecommendationForm';

interface ProfileModalProps {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  option: string;
  itemId: string;
  editItem: (itemName: string, id: string, item: any) => void;
  item: any;
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  openModal,
  setOpenModal,
  option,
  itemId,
  editItem,
  item,
}) => {
  const { onClose } = useDisclosure();

  const closeModal = () => {
    setOpenModal(false);
  };

  const renderForm = () => {
    switch (option) {
      case 'contact':
        return (
          <Details
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'jobs':
        return (
          <Jobs
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'education':
        return (
          <Education
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'skills':
        return (
          <Skills
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'volunteer':
        return (
          <VolunteerForm
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'certifications':
        return (
          <CertForm
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'courses':
        return (
          <CoursesForm
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'honorsAwards':
        return (
          <HonorsForm
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'languages':
        return (
          <LanguagesForm
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'publications':
        return (
          <PublicationsForm
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'patents':
        return (
          <PatentsForm
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      case 'recommendations':
        return (
          <RecommendationForm
            itemId={itemId}
            editItem={editItem}
            item={item}
            closeModal={closeModal}
          />
        );
      default:
        return <Details itemId={itemId} closeModal={closeModal} />;
    }
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={openModal}
      motionPreset='slideInRight'
    >
      <ModalOverlay />
      <ModalContent p={6} mx={2}>
        <CloseButton size='md' ml='auto' onClick={closeModal} />
        <ModalHeader fontSize='md' p={0} mb={2}>
          {option.toLocaleUpperCase()}
        </ModalHeader>
        <ModalBody p={0}>{renderForm()}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
