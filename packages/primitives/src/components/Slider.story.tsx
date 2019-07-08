import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import { Slider } from './Slider';
import { theme } from '../theme';

const options = ops => ({ '': 'null', ...ops });
const sizeKnob = (label, fallback = undefined) => select(label, options(theme.sizes), fallback);
const colorKnob = (label, fallback = undefined) => select(label, options(theme.colors), fallback);
const radiiKnob = (label, fallback = undefined) => select(label, options(theme.radii), fallback);

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
