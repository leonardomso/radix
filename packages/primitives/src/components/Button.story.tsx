import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import 'styled-components/macro';
import { Button } from './Button';
import { theme } from '../theme';
import { css as sx } from '@styled-system/css';
import { variant } from '@modulz/radix-system';

const options = ops => ({ '': 'null', ...ops });
const spaceKnob = label => select(label, options(theme.space));
const colorKnob = label => select(label, options(theme.colors));
const radiiKnob = label => select(label, options(theme.radii));
const borderKnob = label => select(label, options(theme.borderWidths));
const fontSizeKnob = label => select(label, options(theme.fontSizes), 2);
const fontFamilyKnob = label => select(label, options(theme.fonts), 'normal');
const fontWeightKnob = label => select(label, options(theme.fontWeights));
const lineHeightKnob = label => select(label, options(theme.lineHeights));

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

function RadixButton(props) {
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
