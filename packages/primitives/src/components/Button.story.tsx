import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import 'styled-components/macro';
import { Button } from './Button';
import { theme } from '../theme';
import { css as sx } from '@styled-system/css';
import { variant } from '@modulz/radix-system';

const options = (ops: any) => ({ '': 'null', ...ops });
const spaceKnob = (name = '', value?: any) => select(name, options(theme.space), value);
const colorKnob = (name = '', value?: any) => select(name, options(theme.colors), value);
const radiiKnob = (name = '', value?: any) => select(name, options(theme.radii), value);
const borderKnob = (name = '', value?: any) => select(name, options(theme.borderWidths), value);
const fontSizeKnob = (name = '', value = 2) => select(name, options(theme.fontSizes), value);
const fontFamilyKnob = (name = '', value = 'normal') => select(name, options(theme.fonts), value);
const fontWeightKnob = (name = '', value?: any) => select(name, options(theme.fontWeights), value);
const lineHeightKnob = (name = '', value?: any) => select(name, options(theme.lineHeights), value);

storiesOf('Components|Button', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <>
      {/* <Button
        padding={spaceKnob('Padding')}
        paddingTop={spaceKnob('Padding top')}
        paddingRight={spaceKnob('Padding right')}
        paddingBottom={spaceKnob('Padding bottom')}
        paddingLeft={spaceKnob('Padding left')}
        paddingY={spaceKnob('Padding Y')}
        paddingX={spaceKnob('Padding X')}
        textColor={colorKnob('Text color')}
        backgroundColor={colorKnob('Background color')}
        borderRadius={radiiKnob('Border radius')}
        borderColor={colorKnob('Border color')}
        borderWidth={borderKnob('Border width')}
        fontFamily={fontFamilyKnob('Font')}
        fontSize={fontSizeKnob('Font size')}
        fontWeight={fontWeightKnob('Font Weight')}
        lineHeight={lineHeightKnob('Line height')}
      >
        Button
      </Button> */}

      {/* <Button
        variant={select('variant', ['primary', 'danger'])}
        marginTop={spaceKnob('Margin top')}
        css={[
          sx({
            backgroundColor: 'blue400',
            '&:hover': {
              backgroundColor: 'blue600',
            },
          }),
          variant({
            variant: {
              primary: {
                color: 'blue200',
              },
              danger: {
                backgroundColor: 'red400',
                color: 'red200',
              },
            },
          }),
        ]}
      >
        Hello
      </Button> */}
      <RadixButton>Hello</RadixButton>
      <RadixButton size="medium">Hello</RadixButton>
      <RadixButton variant="danger" ml={8}>
        Hello
      </RadixButton>
      <RadixButton variant="danger" size="medium" ml={8}>
        Hello
      </RadixButton>
    </>
  ));

function RadixButton(props: any) {
  return (
    <Button
      {...props}
      css={[
        sx({
          backgroundColor: 'blue400',
          ':hover': {
            backgroundColor: 'blue600',
          },
        }),
        variant({
          variant: {
            primary: {
              color: 'blue200',
            },
            danger: {
              backgroundColor: 'red400',
              color: 'red200',
              '&:hover': {
                backgroundColor: 'red600',
              },
            },
          },
        }),
        variant({
          size: {
            small: {},
            medium: {
              paddingY: 3,
            },
          },
        }),
      ]}
    />
  );
}
