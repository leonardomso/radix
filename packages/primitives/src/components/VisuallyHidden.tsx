import React from 'react';

type VisuallyHiddenProps = {
  children: React.ReactNode;
};

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return (
    <span
      // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      {children}
    </span>
  );
}
