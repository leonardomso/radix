import React from 'react';
import { observeElementRect } from '../utils/observeElementRect';

type UseRectOptions = {
  /** A reference to the element whose rect to observe */
  refToObserve: React.MutableRefObject<HTMLElement | null>;
  /** Whether we want to currently observe or not */
  isObserving: boolean;
};

/**
 * Use this custom hook to get access to an element's rect (getBoundingClientRect)
 * and observe it along time.
 */
export function useRect({ refToObserve, isObserving = true }: UseRectOptions) {
  const [rect, setRect] = React.useState<ClientRect>();
  React.useLayoutEffect(() => {
    if (isObserving) {
      const unobserve = observeElementRect(refToObserve.current, setRect);
      return () => {
        unobserve();
      };
    }
  }, [isObserving, refToObserve]);
  return rect;
}
