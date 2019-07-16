import React from 'react';
import { storiesOf } from '@storybook/react';
import { Dialog } from './Dialog';

storiesOf('Components|Dialog', module)
  .add('default', () => <Default />)
  .add('focus trap', () => <FocusTrap />)
  .add('custom focus', () => <CustomFocus />);

function Default() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open dialog
      </button>
      <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <button type="button" onClick={() => setIsOpen(false)}>
          Close dialog
        </button>
      </Dialog>
    </>
  );
}

function FocusTrap() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open dialog
      </button>
      <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <button type="button" onClick={() => setIsOpen(false)}>
          Close dialog
        </button>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" placeholder="John" />

          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" placeholder="Doe" />

          <button type="submit">Send</button>
        </div>
      </Dialog>
      <p>These elements can't be focused when the dialog is opened.</p>
      <button type="button">A button</button>
      <input type="text" placeholder="Another focusable element" />
    </>
  );
}

function CustomFocus() {
  const [isOpen, setIsOpen] = React.useState(false);
  const lastButtonRef = React.useRef<HTMLInputElement>(null);
  const firstNameRef = React.useRef<HTMLInputElement>(null);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open dialog
      </button>

      <Dialog
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        refToFocusOnOpen={firstNameRef}
        refToFocusOnClose={lastButtonRef}
      >
        <button type="button" onClick={() => setIsOpen(false)}>
          Close dialog
        </button>

        <div>
          <p>The first name input will receive the focus after opening the dialog.</p>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" placeholder="John" ref={firstNameRef} />

          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" placeholder="Doe" />

          <button type="submit">Send</button>
        </div>
      </Dialog>

      <div>
        <p>The search input will receive the focus after closing the dialog.</p>
        <input type="text" placeholder="Search…" ref={lastButtonRef} />
      </div>
    </>
  );
}
