import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import { Slider } from './Slider';
import { theme } from '../theme';

const options = (ops: any) => ({ '': 'null', ...ops });
const sizeKnob = (label = '', value?: any) => select(label, options(theme.sizes), value);
const colorKnob = (label = '', value?: any) => select(label, options(theme.colors), value);
const radiiKnob = (label = '', value?: any) => select(label, options(theme.radii), value);

storiesOf('Components|Slider', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ padding: 30 }}>
        <Slider
          trackStyle={{
            backgroundColor: colorKnob('Track background color'),
            height: sizeKnob('Track height'),
            borderRadius: radiiKnob('Track radii', 3),
          }}
          innerTrackStyle={{ backgroundColor: colorKnob('Inner Track background color') }}
          thumbStyle={{
            backgroundColor: colorKnob('Thumb background color', 'white'),
            borderColor: colorKnob('Thumb border color', 'gray'),
            width: sizeKnob('Thumb width', 3),
            height: sizeKnob('Thumb height', 3),
            borderRadius: radiiKnob('Thumb radii', 3),
          }}
        />
      </div>
    );
  });
