/**
 * Observes an element's rectangle on screen (getBoundingClientRect)
 * This is useful to track elements on the screen and attach other elements
 * that might be in different layers, etc.
 */
export function observeElementRect(
  /** The element whose rect to observe */
  elementToObserve: HTMLElement | null,
  /** The callback which will be called when the rect changes */
  callback: CallbackFn
) {
  // We accept null to simplify call site with TS and react refs being temporarily null
  if (elementToObserve === null) {
    return () => {};
  }

  const observedData = observedElements.get(elementToObserve);

  if (observedData === undefined) {
    // We add the element to the map of observed elements with its first callback
    // because this is the first time this element is observed
    observedElements.set(elementToObserve, { rect: {} as ClientRect, callbacks: [callback] });

    if (observedElements.size === 1) {
      // We start our own internal loop once we are observing at least 1 element
      runLoop();
    }
  } else {
    // We only need to a callback for this element as it's already observed
    observedData.callbacks.push(callback);
  }

  return () => {
    const observedData = observedElements.get(elementToObserve);
    if (observedData === undefined) return;

    // We start by removing the callback
    const index = observedData.callbacks.indexOf(callback);
    if (index > -1) {
      observedData.callbacks.splice(index, 1);
    }

    if (observedData.callbacks.length === 0) {
      // We we can stop observing this element because there are no
      // callbacks registered for it anymore
      observedElements.delete(elementToObserve);

      if (observedElements.size === 0) {
        // We stop our own internal loop
        // once we are not observing any elements anymore
        cancelAnimationFrame(rafId);
      }
    }
  };
}

// ========================================================================
// module internals

type CallbackFn = (rect: ClientRect) => void;

type ObservedData = {
  rect: ClientRect;
  callbacks: Array<CallbackFn>;
};

let rafId: number;
const observedElements: Map<HTMLElement, ObservedData> = new Map();

function runLoop() {
  const changedRectsData: Array<ObservedData> = [];

  // Do all DOM reads first (getBoundingClientRect)
  observedElements.forEach((data, element) => {
    const newRect = element.getBoundingClientRect();

    // Gather all the data for elements whose rects have changed
    if (!rectEquals(data.rect, newRect)) {
      data.rect = newRect;
      changedRectsData.push(data);
    }
  });

  // DOM writes will most likely happen with the callbacks
  // so we group then here after the DOM reads (getBoundingClientRect)
  changedRectsData.forEach(data => {
    data.callbacks.forEach(callback => callback(data.rect));
  });

  rafId = requestAnimationFrame(runLoop);
}

function rectEquals(rect1: ClientRect, rect2: ClientRect) {
  return (
    rect1.width === rect2.width &&
    rect1.height === rect2.height &&
    rect1.top === rect2.top &&
    rect1.right === rect2.right &&
    rect1.bottom === rect2.bottom &&
    rect1.left === rect2.left
  );
}
// ========================================================================
