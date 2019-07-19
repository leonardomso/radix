export const SIDE_OPTIONS = ['top', 'right', 'bottom', 'left'] as const;
export const ALIGN_OPTIONS = ['start', 'center', 'end'] as const;

export type Axis = 'x' | 'y';

export type Side = typeof SIDE_OPTIONS[number];

export type Align = typeof ALIGN_OPTIONS[number];

export type Point = { x: number; y: number };
