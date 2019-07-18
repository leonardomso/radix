import React from 'react';
import { storiesOf } from '@storybook/react';
import { useRect } from '../components/useRect';
import {
  PLACEMENT_OPTIONS,
  getPlacementCoords,
  getPlacementStylesRelativeToWindow,
} from './placement';
import { useInterval } from './useInterval';

storiesOf('Utils|placement', module).add('default', () => <Example />);

function Example() {
  const [isAuto, setIsAuto] = React.useState(true);
  const [placementIndex, setPlacementIndex] = React.useState(0);
  const placement = PLACEMENT_OPTIONS[placementIndex];

  const targetRef = React.useRef<HTMLDivElement>(null);
  const targetRect = useRect({ refToObserve: targetRef, isObserving: true });

  const placingRef = React.useRef<HTMLDivElement>(null);
  const placingRect = useRect({ refToObserve: placingRef, isObserving: true });

  const placementCoords = getPlacementCoords({ targetRect, placingRect, placement });
  const placementStyles = getPlacementStylesRelativeToWindow(placementCoords);

  useInterval(
    () => {
      setPlacementIndex((placementIndex + 1) % PLACEMENT_OPTIONS.length);
    },
    isAuto ? 300 : null
  );

  return (
    <>
      <input
        id="isAuto"
        type="checkbox"
        checked={isAuto}
        onChange={event => setIsAuto(event.target.checked)}
      />{' '}
      <label htmlFor="isAuto">Automatically cycle through placement option</label>
      <div
        style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div
          ref={targetRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 200,
            backgroundColor: '#ccc',
          }}
        >
          Target
        </div>
      </div>
      <div
        ref={placingRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          backgroundColor: 'hotpink',
          position: 'absolute',
          ...placementStyles,
        }}
      >
        <select
          value={placementIndex}
          onChange={event => setPlacementIndex(Number(event.target.value))}
        >
          {PLACEMENT_OPTIONS.map((placement, index) => (
            <option value={index}>{placement}</option>
          ))}
        </select>
      </div>
      <div style={{ height: '100vh' }} />
    </>
  );
}
