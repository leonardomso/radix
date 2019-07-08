import React, { FC } from 'react';
import { Box } from '@modulz/radix';
import { Button, ButtonProps } from './Button';

type ButtonWithIconProps = {
  icon: any;
  iconPosition?: 'before' | 'after';
  iconGap?: any;
} & ButtonProps;

export const ButtonWithIcon: FC<ButtonWithIconProps> = ({
  children,
  icon: Icon,
  iconPosition,
  iconGap,
  ...props
}) => {
  return (
    <Button {...props}>
      {iconPosition === 'before' && (
        <Box display="inline-flex" marginRight={iconGap}>
          <Icon size="15" />
        </Box>
      )}

      {children}

      {iconPosition === 'after' && (
        <Box display="inline-flex" marginLeft={iconGap}>
          <Icon size="15" />
        </Box>
      )}
    </Button>
  );
};

ButtonWithIcon.defaultProps = { iconPosition: 'before', iconGap: 2 };
