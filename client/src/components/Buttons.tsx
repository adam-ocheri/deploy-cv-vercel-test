import { Button as ChakraButton } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { StarIcon } from '@chakra-ui/icons';
import { FC, ReactNode } from 'react';
import { transform } from 'typescript';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'action';

type ButtonType = 'submit' | 'reset' | 'button';

interface ButtonProps {
  variant?: ButtonVariant;
  label?: string;
  type?: ButtonType;
  block?: boolean;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const variantStyles: Record<ButtonVariant, any> = {
  primary: {
    variant: 'solid',
    bg: 'blueStart',
    color: 'white',
    hover: { bg: 'blueEnd' },
  },
  secondary: {
    variant: 'outline',
    color: 'blueStart',
    borderWidth: 2,
    borderColor: 'blueStart',
    hover: { bg: 'none', borderColor: 'blueEnd', color: 'blueEnd' },
  },
  tertiary: {
    variant: 'ghost',
    color: 'blueStart',
    hover: {
      textDecoration: 'underline',
      textDecorationThickness: '2px',
      textUnderlineOffset: '4px',
    },
  },
  action: {
    variant: 'solid',
    bgGradient: theme.styles.global.body.bgGradient,
    color: 'white',
    hover: {
      bgGradient: `linear(to-r, blueEnd, blueStart)`,
    },
  },
};

const Button: FC<ButtonProps> = ({
  block = false,
  variant = 'primary',
  type = 'button',
  children,
  disabled = false,
  onClick,
}) => {
  const variantStyle = variantStyles[variant] || {};

  return (
    <ChakraButton
      type={type}
      display='flex'
      justifyContent='center'
      alignItems='center'
      gap={2}
      w={block ? 'full' : undefined}
      isDisabled={disabled}
      onClick={onClick}
      _hover={variantStyle.hover}
      {...variantStyle}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
