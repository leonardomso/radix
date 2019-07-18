import React from 'react';
import { storiesOf } from '@storybook/react';
import { useRect } from '../components/useRect';
import { getCollisions } from './collision';

storiesOf('Utils|collision', module).add('default', () => <Example />);

function Example() {
  const elementRef = React.useRef<HTMLDivElement>(null);
  const elementRect = useRect({ refToObserve: elementRef, isObserving: true });
  const collisions = elementRect ? getCollisions(elementRect) : null;

  return (
    <>
      <div style={{ height: '50vh' }} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '200vw',
          height: '100vh',
        }}
      >
        <div style={{ width: '50vw', height: '100%', flexShrink: 0 }} />
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
          }}
        >
          <div
            ref={elementRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              height: 200,
              padding: 24,
              backgroundColor: 'hotpink',
            }}
          >
            {collisions !== null && (
              <ul>
                <li>top: {collisions.top ? '❌' : '✅'}</li>
                <li>right: {collisions.right ? '❌' : '✅'}</li>
                <li>bottom: {collisions.bottom ? '❌' : '✅'}</li>
                <li>left: {collisions.left ? '❌' : '✅'}</li>
              </ul>
            )}
          </div>
        </div>
        <div style={{ width: '50vw', height: '100%', flexShrink: 0 }} />
      </div>
      <div style={{ height: '50vh' }} />
    </>
  );
}
