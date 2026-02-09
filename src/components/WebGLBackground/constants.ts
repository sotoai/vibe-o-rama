export interface DeviceConfig {
  gridSize: number;
  particleCount: number;
  pixelRatio: number;
  antialias: boolean;
}

export const DESKTOP_CONFIG: DeviceConfig = {
  gridSize: 10,
  particleCount: 1000, // 10^3
  pixelRatio: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2),
  antialias: true,
};

export const MOBILE_CONFIG: DeviceConfig = {
  gridSize: 7,
  particleCount: 343, // 7^3
  pixelRatio: 1,
  antialias: false,
};

export const MOBILE_BREAKPOINT = 768;

export const CUBE_SIZE = 0.12;
export const GRID_SPACING = 0.25;

// Colors matching the site's accent palette
export const COLORS = {
  keyLight: 0xa855f7,    // purple
  fillLight: 0x06b6d4,   // cyan
  rimLight: 0xffffff,     // white
  materialBase: 0x3b1a6e, // medium purple (brighter for visibility)
  emissive: 0x7c3aed,     // vibrant purple glow
  gradientTop: 0xa855f7,  // purple (top of particles)
  gradientBottom: 0x06b6d4, // cyan (bottom of particles)
};

// Scroll breakpoints for morph transitions
export const SCROLL_BREAKPOINTS = {
  cubeEnd: 0.15,
  explodedEnd: 0.35,
  sphereEnd: 0.55,
  helixEnd: 0.75,
  scatterEnd: 1.0,
};

export const CAMERA_Z = 5;
export const AMBIENT_ROTATION_SPEED = 0.08;
export const FLOAT_AMPLITUDE = 0.02;
export const FLOAT_SPEED = 1.5;
