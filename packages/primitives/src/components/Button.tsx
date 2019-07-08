import styled from 'styled-components';
import {
  margin,
  MarginProps,
  padding,
  PaddingProps,
  backgroundColor,
  BackgroundColorProps,
  textColor,
  TextColorProps,
  borderRadius,
  BorderRadiusProps,
  border,
  BorderProps,
  fontSize,
  FontSizeProps,
  fontFamily,
  FontFamilyProps,
  fontWeight,
  FontWeightProps,
  lineHeight,
  LineHeightProps,
  compose,
} from '@modulz/radix-system';

type ButtonProps = MarginProps &
  PaddingProps &
  BackgroundColorProps &
  TextColorProps &
  BorderRadiusProps &
  BorderProps &
  FontSizeProps &
  FontFamilyProps &
  FontWeightProps &
  LineHeightProps;
const styleProps = compose(
  margin,
  padding,
  backgroundColor,
  textColor,
  borderRadius,
  border,
  fontSize,
  fontWeight,
  fontFamily,
  lineHeight
);

export const Button = styled('button')<ButtonProps>({ appearance: 'none' }, styleProps);
