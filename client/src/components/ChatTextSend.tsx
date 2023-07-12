import { Flex, Icon, Input } from '@chakra-ui/react';
import Image from 'next/image';
import { FaUser } from 'react-icons/fa';
import paperPlainIcon from '../images/paperplain.svg';

const ChatTextSend = () => {
  return (
    <Flex alignItems='center' gap='8px'>
      <Icon as={FaUser} height='44px' width='44px' p='5px' />
      <Input border='1px solid black' borderRadius='10px' />
      <Image
        src={paperPlainIcon}
        alt='Paper plain icon'
        width={35}
        height={35}
      />
    </Flex>
  );
};

export default ChatTextSend;
