import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  test('does not render anything when closed', () => {
    const { baseElement } = render(<Dialog isOpen={false}>Dialog</Dialog>);
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div />
      </body>
    `);
  });

  test('renders a modal when opened', () => {
    const { getByRole } = render(<Dialog isOpen>Dialog</Dialog>);
    expect(getByRole('modal')).toHaveTextContent(/dialog/i);
  });

  test('can be dismissed via escape key', () => {
    const handleDismiss = jest.fn();
    const { getByRole } = render(
      <Dialog isOpen onDismiss={handleDismiss}>
        Dialog
      </Dialog>
    );
    fireEvent.keyUp(getByRole('modal'), { key: 'Escape', code: 27 });
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  test('can prevent dismissing via escape key', () => {
    const handleDismiss = jest.fn();
    const { getByRole } = render(
      <Dialog isOpen canDismiss={false} onDismiss={handleDismiss}>
        Dialog
      </Dialog>
    );
    fireEvent.keyUp(getByRole('modal'), { key: 'Escape', code: 27 });
    expect(handleDismiss).not.toHaveBeenCalled();
  });

  test('can be dismissed via click outside', () => {
    const handleDismiss = jest.fn();
    const { baseElement } = render(
      <Dialog isOpen onDismiss={handleDismiss}>
        Dialog
      </Dialog>
    );
    fireEvent.click(baseElement);
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  test('can prevent dismissing via click outside', () => {
    const handleDismiss = jest.fn();
    const { baseElement } = render(
      <Dialog isOpen canDismiss={false} onDismiss={handleDismiss}>
        Dialog
      </Dialog>
    );
    fireEvent.click(baseElement);
    expect(handleDismiss).not.toHaveBeenCalled();
  });

  // Unfortunately tab navigation is not supported in JSDOM
  // so this test will never pass. I'm leaving the test here for reference though.
  // See: https://github.com/testing-library/react-testing-library/issues/376#issuecomment-497369928
  test.skip('traps focus inside the dialog', () => {
    const { getByRole, getByText, getByLabelText } = render(
      <>
        <button type="button">Before</button>
        <Dialog isOpen>
          <button type="button">Close</button>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" />
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" />
        </Dialog>
        <button type="button">After</button>
      </>
    );
    const dialog = getByRole('modal');

    // verify where the focus is
    expect(getByText(/close/i)).toHaveFocus();

    // press tab and check that focus has moved to next tabbable element
    fireEvent.keyUp(dialog, { key: 'Tab', code: 9 });
    expect(getByLabelText(/first name/i)).toHaveFocus();

    // press tab and check that focus has moved to next tabbable element
    fireEvent.keyUp(dialog, { key: 'Tab', code: 9 });
    expect(getByLabelText(/last name/i)).toHaveFocus();

    // press tab and check that focus is back on first element (close button)
    fireEvent.keyUp(dialog, { key: 'Tab', code: 9 });
    expect(getByText(/close/i)).toHaveFocus();
  });

  test('focuses on first focusable element inside dialog', () => {
    const { getByText } = render(
      <Dialog isOpen>
        <button type="button">Close</button>
      </Dialog>
    );
    expect(getByText(/close/i)).toHaveFocus();
  });

  test('returns focus to previously focused element outside dialog', () => {
    function Example() {
      const [isOpen, setIsOpen] = React.useState(false);
      return (
        <>
          <button type="button" onClick={() => setIsOpen(true)}>
            Open
          </button>
          <Dialog isOpen={isOpen}>
            <button type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </Dialog>
        </>
      );
    }
    const { getByText } = render(<Example />);

    // focus on the open button and click it
    getByText(/open/i).focus();
    fireEvent.click(getByText(/open/i));

    // verify that it is not focused anymore
    expect(getByText(/open/i)).not.toHaveFocus();

    // click the close button to close the dialog
    fireEvent.click(getByText(/close/i));

    // verify that the focus is back on the open button
    expect(getByText(/open/i)).toHaveFocus();
  });

  test('focuses on custom element inside dialog', () => {
    function Example() {
      const inputRef = React.useRef<HTMLInputElement>(null);
      return (
        <Dialog isOpen refToFocusOnOpen={inputRef}>
          <button type="button">Close</button>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" ref={inputRef} />
        </Dialog>
      );
    }
    const { getByLabelText } = render(<Example />);
    expect(getByLabelText(/first name/i)).toHaveFocus();
  });

  test('return focus on custom element outside dialog', () => {
    function Example() {
      const [isOpen, setIsOpen] = React.useState(false);
      const inputRef = React.useRef<HTMLInputElement>(null);
      return (
        <>
          <button type="button" onClick={() => setIsOpen(true)}>
            Open
          </button>
          <Dialog isOpen={isOpen} refToFocusOnClose={inputRef}>
            <button type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </Dialog>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" ref={inputRef} />
        </>
      );
    }
    const { getByText, getByLabelText } = render(<Example />);

    // focus on the open button and click it
    getByText(/open/i).focus();
    fireEvent.click(getByText(/open/i));

    // verify that it is not focused anymore
    expect(getByText(/open/i)).not.toHaveFocus();

    // click the close button to close the dialog
    fireEvent.click(getByText(/close/i));

    // verify that the focus is now on the desired element
    expect(getByLabelText(/first name/i)).toHaveFocus();
  });
});
