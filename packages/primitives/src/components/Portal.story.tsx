import React from 'react';
import { storiesOf } from '@storybook/react';
import { Portal } from './Portal';

storiesOf('Components|Portal', module).add('default', () => (
  <>
    <div style={{ maxWidth: 300, maxHeight: 200, overflow: 'auto', border: '3px solid' }}>
      <h1>This content is rendered in the main DOM tree</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos porro, est ex quia itaque
        facere fugit necessitatibus aut enim. Nisi rerum quae, repellat in perspiciatis explicabo
        laboriosam necessitatibus eius pariatur.
      </p>

      <Portal>
        <h1>This content is rendered in a portal (another DOM tree)</h1>
        <p>
          Because of the portal, it can appear in a different DOM tree from the main one, even
          though it is part of the same React tree.
        </p>
      </Portal>
    </div>
  </>
));
