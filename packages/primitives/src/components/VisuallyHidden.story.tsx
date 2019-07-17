import React from 'react';
import { storiesOf } from '@storybook/react';
import { BellIcon } from '@modulz/radix-icons';
import { VisuallyHidden } from './VisuallyHidden';

storiesOf('Components|VisuallyHidden', module).add('default', () => (
  <>
    <p>Screen readers will enunciate the button below as "Notifications, button."</p>
    <button type="button">
      <VisuallyHidden>Notifications</VisuallyHidden>
      <BellIcon aria-hidden />
    </button>
  </>
));
