import { Side } from './geometry';

export type Collisions = Record<Side, boolean>;

export function getCollisions(rect: ClientRect): Collisions {
  return {
    top: rect.top < 0,
    right: rect.right > window.innerWidth,
    bottom: rect.bottom > window.innerHeight,
    left: rect.left < 0,
  };
}
