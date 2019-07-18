import React from 'react';
import { FocusOn } from 'react-focus-on';
import { Portal } from './Portal';
import { Overlay } from './Overlay';

type DialogProps = {
  children: React.ReactNode;
  isOpen?: boolean;
  /**
   * Whether the dialog can be dismissed via click outside / escape key
   */
  canDismiss?: boolean;
  onDismiss?: () => void;
  /**
   * A reference to an element to focus on inside the dialog after it opens.
   * If not provided, it will focus on the first focusable element.
   */
  refToFocusOnOpen?: React.MutableRefObject<HTMLElement | null>;
  /**
   * A reference to an element to focus on outside the dialog after it closes.
   * If not provided, it will focus on the last focused element before the dialog was opened.
   */
  refToFocusOnClose?: React.MutableRefObject<HTMLElement | null>;
};

export function Dialog({
  children,
  isOpen,
  canDismiss = true,
  onDismiss,
  refToFocusOnOpen,
  refToFocusOnClose,
}: DialogProps) {
  return isOpen ? (
    <Portal>
      <Overlay />
      <Lock
        isActive={isOpen}
        canDismiss={canDismiss}
        onDismiss={onDismiss}
        refToFocusOnOpen={refToFocusOnOpen}
        refToFocusOnClose={refToFocusOnClose}
      >
        <div
          // minimum functional styles to create a layer on top
          style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, pointerEvents: 'none' }}
        >
          <DialogContent>{children}</DialogContent>
        </div>
      </Lock>
    </Portal>
  ) : null;
}

type DialogContentProps = {
  children: React.ReactNode;
};

function DialogContent({ children }: DialogContentProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      // minimal functional styles
      style={{
        backgroundColor: 'white',
        pointerEvents: 'auto',
        outline: 'none',
      }}
    >
      {children}
    </div>
  );
}

type LockProps = {
  children: React.ReactNode;
  isActive: boolean;
  /**
   * Whether the lock can be dismissed via click outside / escape key
   */
  canDismiss: boolean;
  onDismiss?: () => void;
  refToFocusOnOpen?: React.MutableRefObject<HTMLElement | null>;
  refToFocusOnClose?: React.MutableRefObject<HTMLElement | null>;
};

function Lock({
  children,
  isActive,
  canDismiss,
  onDismiss,
  refToFocusOnOpen,
  refToFocusOnClose,
}: LockProps) {
  return (
    <FocusOn
      enabled={isActive}
      autoFocus
      onActivation={() => {
        if (refToFocusOnOpen && refToFocusOnOpen.current) {
          refToFocusOnOpen.current.focus();
        }
      }}
      // we disable the default return to focus feature if the user wants
      // to focus on a custom element rather than back to initially focused one
      returnFocus={refToFocusOnClose ? false : true}
      onDeactivation={() => {
        if (refToFocusOnClose && refToFocusOnClose.current) {
          refToFocusOnClose.current.focus();
        }
      }}
      onEscapeKey={canDismiss ? onDismiss : undefined}
      onClickOutside={canDismiss ? onDismiss : undefined}
    >
      {children}
    </FocusOn>
  );
}
