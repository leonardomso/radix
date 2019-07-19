import { getCollisions, Collisions } from './collision';
import { Axis, Side, Align, Point } from './geometry';

/**
 * Get a point (x, y) for the placement of a rect based on a target rect
 * given a side (top, right, bottom, left) and an alignment (start, center, end)
 */
export function getPlacementPoint(
  /** The rect of the target we are placing around */
  targetRect: ClientRect,
  /** The rect of the element to place */
  placingRect: ClientRect,
  /** The desired side */
  side: Side,
  /** The desired alignment */
  align: Align,
  sideOffset: number = 0,
  alignOffset: number = 0
): Point {
  // pre-compute points for all potential placements
  const allPlacementPoints = getAllPlacementPoints(
    targetRect,
    placingRect,
    sideOffset,
    alignOffset
  );

  // get point based on side / align
  const point = allPlacementPoints[side][align];

  // create a new rect as if element had been moved to new placement
  const updatedPlacingRect = updateRectWithPoint(placingRect, point);

  // check for any collisions in new placement
  const placingCollisions = getCollisions(updatedPlacingRect);

  // adjust side / align accounting for collisions
  const adjustedSide = getSideAccountingForCollisions(side, placingCollisions);
  const adjustedAlign = getAlignAccountingForCollisions(side, align, placingCollisions);

  // get new point based on adjusted side / align
  const adjustedPoint = allPlacementPoints[adjustedSide][adjustedAlign];
  return adjustedPoint;
}

export function getPlacementStylesForPoint({ x, y }: Point): React.CSSProperties {
  return {
    top: y + window.pageYOffset,
    left: x + window.pageXOffset,
  };
}

type AllPlacementPoints = Record<Side, Record<Align, Point>>;

function getAllPlacementPoints(
  targetRect: ClientRect,
  placingRect: ClientRect,
  sideOffset: number = 0,
  alignOffset: number = 0
): AllPlacementPoints {
  const x = getPlacementSlotsForAxis(targetRect, placingRect, 'x');
  const y = getPlacementSlotsForAxis(targetRect, placingRect, 'y');

  // prettier-ignore
  const map: AllPlacementPoints = {
    top: {
      start:  { x: x.start + alignOffset,  y: y.before + sideOffset },
      center: { x: x.center,               y: y.before + sideOffset },
      end:    { x: x.end - alignOffset,    y: y.before + sideOffset },
    },
    right: {
      start:  { x: x.after - sideOffset,   y: y.start + alignOffset },
      center: { x: x.after - sideOffset,   y: y.center },
      end:    { x: x.after - sideOffset,   y: y.end - alignOffset },
    },
    bottom: {
      start:  { x: x.start + alignOffset,  y: y.after - sideOffset },
      center: { x: x.center,               y: y.after - sideOffset },
      end:    { x: x.end - alignOffset,    y: y.after - sideOffset },
    },
    left: {
      start:  { x: x.before + sideOffset,  y: y.start + alignOffset },
      center: { x: x.before + sideOffset,  y: y.center },
      end:    { x: x.before + sideOffset,  y: y.end - alignOffset },
    },
  };

  return map;
}

function getPlacementSlotsForAxis(targetRect: ClientRect, placingRect: ClientRect, axis: Axis) {
  const startSide = axis === 'x' ? 'left' : 'top';
  const targetStart = targetRect[startSide];

  const dimension = axis === 'x' ? 'width' : 'height';
  const targetDimension = targetRect[dimension];
  const placingDimension = placingRect[dimension];

  // prettier-ignore
  return {
    before: targetStart - placingDimension,
    start:  targetStart,
    center: targetStart + (targetDimension - placingDimension) / 2,
    end:    targetStart + targetDimension - placingDimension,
    after:  targetStart + targetDimension,
  };
}

function updateRectWithPoint(rect: ClientRect, { x, y }: Point): ClientRect {
  return {
    ...rect,
    top: y,
    bottom: y + rect.height,
    left: x,
    right: x + rect.width,
  };
}

function getSideAccountingForCollisions(side: Side, collisions: Collisions): Side {
  return collisions[side] ? getOppositeSide(side) : side;
}

function getAlignAccountingForCollisions(side: Side, align: Align, collisions: Collisions): Align {
  let newAlign = align;

  if (side === 'top' || side === 'bottom') {
    if ((align === 'start' && collisions.right) || (align === 'center' && collisions.right)) {
      newAlign = 'end';
    }
    if ((align === 'end' && collisions.left) || (align === 'center' && collisions.left)) {
      newAlign = 'start';
    }
  }

  if (side === 'left' || side === 'right') {
    if ((align === 'start' && collisions.bottom) || (align === 'center' && collisions.bottom)) {
      newAlign = 'end';
    }
    if ((align === 'end' && collisions.top) || (align === 'center' && collisions.top)) {
      newAlign = 'start';
    }
  }

  return newAlign;
}

function getOppositeSide(side: Side): Side {
  const oppositeSides: Record<Side, Side> = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  };
  return oppositeSides[side];
}
