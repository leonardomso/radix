export const PLACEMENT_OPTIONS = [
  'top-start',
  'top-center',
  'top-end',
  'top-right',

  'right-start',
  'right-center',
  'right-end',
  'bottom-right',

  'bottom-end',
  'bottom-center',
  'bottom-start',
  'bottom-left',

  'left-end',
  'left-center',
  'left-start',
  'top-left',
] as const;

export type PlacementOption = typeof PLACEMENT_OPTIONS[number];

export type PlacementCoords = {
  x: number;
  y: number;
};

type GetPlacementCoordsOptions = {
  targetRect?: ClientRect;
  placingRect?: ClientRect;
  placement: PlacementOption;
};

type GetPlacementCoordsReturn = PlacementCoords | undefined;

export function getPlacementCoords(options: GetPlacementCoordsOptions): GetPlacementCoordsReturn {
  const { targetRect, placingRect, placement } = options;

  if (targetRect === undefined || placingRect === undefined) {
    return;
  }

  const xBefore = targetRect.left - placingRect.width;
  const xStart = targetRect.left;
  const xMiddle = targetRect.left + targetRect.width / 2 - placingRect.width / 2;
  const xEnd = targetRect.left + targetRect.width - placingRect.width;
  const xAfter = targetRect.left + targetRect.width;

  const yBefore = targetRect.top - placingRect.height;
  const yStart = targetRect.top;
  const yMiddle = targetRect.top + targetRect.height / 2 - placingRect.height / 2;
  const yEnd = targetRect.top + targetRect.height - placingRect.height;
  const yAfter = targetRect.top + targetRect.height;

  // prettier-ignore
  return {
    'top-start':     { x: xStart,  y: yBefore },
    'top-center':    { x: xMiddle, y: yBefore },
    'top-end':       { x: xEnd,    y: yBefore },
    'top-right':     { x: xAfter,  y: yBefore },

    'right-start':   { x: xAfter,  y: yStart, },
    'right-center':  { x: xAfter,  y: yMiddle },
    'right-end':     { x: xAfter,  y: yEnd,   },
    'bottom-right':  { x: xAfter,  y: yAfter, },

    'bottom-end':    { x: xEnd,    y: yAfter, },
    'bottom-center': { x: xMiddle, y: yAfter, },
    'bottom-start':  { x: xStart,  y: yAfter, },
    'bottom-left':   { x: xBefore, y: yAfter, },

    'left-end':      { x: xBefore, y: yEnd,   },
    'left-center':   { x: xBefore, y: yMiddle },
    'left-start':    { x: xBefore, y: yStart, },
    'top-left':      { x: xBefore, y: yBefore },
  }[placement];
}

export function getPlacementStylesRelativeToWindow(
  placementCoords?: PlacementCoords
): React.CSSProperties {
  if (placementCoords === undefined) {
    return { visibility: 'hidden' };
  }
  return {
    top: placementCoords.y + window.pageYOffset,
    left: placementCoords.x + window.pageXOffset,
  };
}
