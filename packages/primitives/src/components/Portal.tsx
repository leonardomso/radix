import React from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
};

export function Portal({ children }: PortalProps) {
  // We need to track the host element so we know if it exist already
  const hostElementRef = React.useRef<HTMLElement | null>(null);
  const hostElement = getHostElement();

  // Lazy initialization of the host element
  // This is to make sure we don't recreate a new DOM element on each render
  function getHostElement() {
    let hostElement = hostElementRef.current;
    if (hostElement !== null) {
      return hostElement;
    }

    hostElement = document.createElement('radix-portal');
    hostElementRef.current = hostElement;

    return hostElement;
  }

  // We append the host element and remove it when necessary
  React.useEffect(function setupPortal() {
    document.body.appendChild(hostElement);

    return function teardowdnPortal() {
      hostElement.remove();
    };
  }, [hostElement]);

  // Render the children of `Portal` inside the host element
  return ReactDOM.createPortal(children, hostElement);
}
