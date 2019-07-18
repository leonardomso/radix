export function getCollisions(rect: ClientRect) {
  return {
    top: rect.top < 0,
    right: rect.right > window.innerWidth,
    bottom: rect.bottom > window.innerHeight,
    left: rect.left < 0,
  };
}
