import React from 'react';
import { storiesOf } from '@storybook/react';
import { useRect } from '../components/useRect';
import { SIDE_OPTIONS, ALIGN_OPTIONS } from './geometry';
import { getPlacementPoint, getPlacementStylesForPoint } from './placement';
import { useInterval } from './useInterval';

storiesOf('Utils|placement', module)
  .add('default', () => <Default />)
  .add('collisions', () => <CollisionsStory />);

function Default() {
  const [isAuto, setIsAuto] = React.useState(true);
  const [sideIndex, setSideIndex] = React.useState(0);
  const side = SIDE_OPTIONS[sideIndex];
  const [alignIndex, setAlignIndex] = React.useState(0);
  const align = ALIGN_OPTIONS[alignIndex];

  const targetRef = React.useRef<HTMLDivElement>(null);
  const targetRect = useRect({ refToObserve: targetRef, isObserving: true });

  const placingRef = React.useRef<HTMLDivElement>(null);
  const placingRect = useRect({ refToObserve: placingRef, isObserving: true });

  const placementPoint =
    targetRect && placingRect
      ? getPlacementPoint(targetRect, placingRect, side, align, -5, -20)
      : null;

  const placementStyles = placementPoint
    ? getPlacementStylesForPoint(placementPoint)
    : ({ visibility: 'hidden' } as React.CSSProperties);

  useInterval(
    () => {
      const nextSideIndex = sideIndex + 1;
      setSideIndex(nextSideIndex % SIDE_OPTIONS.length);
      setAlignIndex(
        (alignIndex + (nextSideIndex === SIDE_OPTIONS.length ? 1 : 0)) % ALIGN_OPTIONS.length
      );
    },
    isAuto ? 1000 : null
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
        <div>
          <select value={sideIndex} onChange={event => setSideIndex(Number(event.target.value))}>
            {SIDE_OPTIONS.map((side, index) => (
              <option key={side} value={index}>
                {side}
              </option>
            ))}
          </select>
          <br />
          <select value={alignIndex} onChange={event => setAlignIndex(Number(event.target.value))}>
            {ALIGN_OPTIONS.map((align, index) => (
              <option key={align} value={index}>
                {align}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

function CollisionsStory() {
  const [isAuto, setIsAuto] = React.useState(false);
  const [sideIndex, setSideIndex] = React.useState(0);
  const side = SIDE_OPTIONS[sideIndex];
  const [alignIndex, setAlignIndex] = React.useState(0);
  const align = ALIGN_OPTIONS[alignIndex];

  const targetRef = React.useRef<HTMLDivElement>(null);
  const targetRect = useRect({ refToObserve: targetRef, isObserving: true });

  const placingRef = React.useRef<HTMLDivElement>(null);
  const placingRect = useRect({ refToObserve: placingRef, isObserving: true });

  const placementPoint =
    targetRect && placingRect
      ? getPlacementPoint(targetRect, placingRect, side, align, -5, -20)
      : null;

  const placementStyles = placementPoint
    ? getPlacementStylesForPoint(placementPoint)
    : ({ visibility: 'hidden' } as React.CSSProperties);

  useInterval(
    () => {
      const nextSideIndex = sideIndex + 1;
      setSideIndex(nextSideIndex % SIDE_OPTIONS.length);
      setAlignIndex(
        (alignIndex + (nextSideIndex === SIDE_OPTIONS.length ? 1 : 0)) % ALIGN_OPTIONS.length
      );
    },
    isAuto ? 1000 : null
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
            ref={targetRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
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
            padding: 100,
            backgroundColor: 'hotpink',
            position: 'absolute',
            ...placementStyles,
          }}
        >
          <div>
            <select value={sideIndex} onChange={event => setSideIndex(Number(event.target.value))}>
              {SIDE_OPTIONS.map((side, index) => (
                <option key={side} value={index}>
                  {side}
                </option>
              ))}
            </select>
            <br />
            <select
              value={alignIndex}
              onChange={event => setAlignIndex(Number(event.target.value))}
            >
              {ALIGN_OPTIONS.map((align, index) => (
                <option key={align} value={index}>
                  {align}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ width: '50vw', height: '100%', flexShrink: 0 }} />
      </div>
      <div style={{ height: '50vh' }} />
    </>
  );
}
