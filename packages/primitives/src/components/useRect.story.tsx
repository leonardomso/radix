import React from 'react';
import { storiesOf } from '@storybook/react';
import { useRect } from './useRect';

storiesOf('Components|useRect', module).add('default', () => <Example />);

function Example() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [isObservingTextarea, setIsObservingTextarea] = React.useState(true);
  const textareaRect = useRect({ refToObserve: textareaRef, isObserving: isObservingTextarea });

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [isObservingButton, setIsObservingButton] = React.useState(true);
  const buttonRect = useRect({ refToObserve: buttonRef, isObserving: isObservingButton });

  return (
    <>
      <input
        id="observingTextarea"
        type="checkbox"
        checked={isObservingTextarea}
        onChange={event => setIsObservingTextarea(event.target.checked)}
      />{' '}
      <label htmlFor="observingTextarea">Observing textarea?</label>
      <br />
      <input
        id="observingButton"
        type="checkbox"
        checked={isObservingButton}
        onChange={event => setIsObservingButton(event.target.checked)}
      />{' '}
      <label htmlFor="observingButton">Observing button?</label>
      <div style={{ height: '30vh' }} />
      <div style={{ marginLeft: 400 }}>
        <p>A textarea</p>
        <textarea
          ref={textareaRef}
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, nesciunt qui! Consequatur mollitia, eius illum delectus aut veniam nam minima impedit! Esse nulla iste, a officia exercitationem ab nam ex!"
        />
      </div>
      {isObservingTextarea && <Rect rect={textareaRect} />}
      <p>A button</p>
      <button ref={buttonRef} type="button">
        Hello
      </button>
      {isObservingButton && <Rect rect={buttonRect} />}
      <div style={{ height: '150vh' }} />
    </>
  );
}

function Rect({ rect }: { rect?: ClientRect }) {
  return (
    <div
      style={
        rect && {
          width: 200,
          padding: 20,
          backgroundColor: 'hotpink',
          position: 'absolute',
          top: 0,
          left: 0,
          willChange: 'transform',
          transform: `translate3d(${rect.left + rect.width + window.pageXOffset}px, ${rect.top +
            rect.height +
            window.pageYOffset}px, 0)`,
        }
      }
    >
      <p>Textarea rect</p>
      <pre>{JSON.stringify(rect, null, 2)}</pre>
    </div>
  );
}
