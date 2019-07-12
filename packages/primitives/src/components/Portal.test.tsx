import React from 'react';
import { render } from '@testing-library/react';
import { Portal } from './Portal';

describe('Portal', () => {
  test('render', () => {
    const { baseElement } = render(<Portal>portal</Portal>);
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div />
        <radix-portal>
          portal
        </radix-portal>
      </body>
    `);
  });

  test('render sibling', () => {
    const { baseElement } = render(
      <>
        <Portal>portal 1</Portal>
        <Portal>portal 2</Portal>
      </>
    );
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div />
        <radix-portal>
          portal 1
        </radix-portal>
        <radix-portal>
          portal 2
        </radix-portal>
      </body>
    `);
  });

  test('cleanup', () => {
    const { baseElement, unmount } = render(<Portal>portal</Portal>);
    unmount();
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div />
      </body>
    `);
  });
});
