import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import { Button } from './Button';
import { theme } from '../theme';

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
      <Button
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
      </Button>
    </>
  ));
