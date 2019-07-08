import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import { ButtonWithIcon } from './ButtonWithIcon';
import { theme } from '../theme';
import { PlusIcon } from '@modulz/radix-icons';

const options = ops => ({ '': 'null', ...ops });
const spaceKnob = label => select(label, options(theme.space));
const colorKnob = label => select(label, options(theme.colors));
const radiiKnob = label => select(label, options(theme.radii));
const borderKnob = label => select(label, options(theme.borderWidths));
const fontSizeKnob = label => select(label, options(theme.fontSizes));

storiesOf('Components|ButtonWithIcon', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <>
      <div style={{ marginBottom: 30 }}>
        <ButtonWithIcon icon={PlusIcon} iconGap={{ gap: 2 }}>
          New project
        </ButtonWithIcon>
      </div>
      <div style={{ marginBottom: 30 }}>
        <ButtonWithIcon icon={PlusIcon} iconPosition="after" iconGap={2}>
          New project
        </ButtonWithIcon>
      </div>
      <div>
        <ButtonWithIcon
          icon={PlusIcon}
          iconGap={2}
          paddingY={2}
          paddingX={2}
          bg="blue500"
          borderRadius={2}
          borderColor="transparent"
          textColor="white"
        >
          New project
        </ButtonWithIcon>
      </div>
    </>
  ))
  .add('playground', () => (
    <>
      <ButtonWithIcon
        icon={PlusIcon}
        iconPosition={select('Icon position', ['before', 'after', 'before'])}
        iconGap={spaceKnob('Icon gap')}
        paddingY={spaceKnob('Padding Y')}
        paddingX={spaceKnob('Padding X')}
        textColor={colorKnob('Text color')}
        backgroundColor={colorKnob('Background color')}
        borderRadius={radiiKnob('Border radius')}
        borderColor={colorKnob('Border color')}
        borderWidth={borderKnob('Border width')}
        fontSize={fontSizeKnob('Font size')}
      >
        New project
      </ButtonWithIcon>
    </>
  ));
