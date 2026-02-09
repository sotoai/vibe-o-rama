import * as THREE from 'three';
import { GRID_SPACING } from './constants';

export type ShapeGenerator = (index: number, gridSize: number) => THREE.Vector3;

// Cube: particles in a grid
export function cubePositions(index: number, gridSize: number): THREE.Vector3 {
  const x = index % gridSize;
  const y = Math.floor(index / gridSize) % gridSize;
  const z = Math.floor(index / (gridSize * gridSize));
  const offset = (gridSize - 1) * GRID_SPACING * 0.5;
  return new THREE.Vector3(
    x * GRID_SPACING - offset,
    y * GRID_SPACING - offset,
    z * GRID_SPACING - offset
  );
}

// Exploded cube: same grid but pushed outward from center
export function explodedPositions(index: number, gridSize: number): THREE.Vector3 {
  const base = cubePositions(index, gridSize);
  const dir = base.clone().normalize();
  const distance = base.length();
  return base.add(dir.multiplyScalar(distance * 0.8));
}

// Sphere: distribute on a sphere surface using fibonacci spiral
export function spherePositions(index: number, gridSize: number): THREE.Vector3 {
  const total = gridSize * gridSize * gridSize;
  const radius = (gridSize - 1) * GRID_SPACING * 0.6;
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const theta = (2 * Math.PI * index) / goldenRatio;
  const phi = Math.acos(1 - (2 * (index + 0.5)) / total);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
}

// Helix: double helix DNA-like structure
export function helixPositions(index: number, gridSize: number): THREE.Vector3 {
  const total = gridSize * gridSize * gridSize;
  const radius = (gridSize - 1) * GRID_SPACING * 0.35;
  const height = (gridSize - 1) * GRID_SPACING * 1.2;
  const t = index / total;
  const angle = t * Math.PI * 6; // 3 full turns
  const strand = index % 2 === 0 ? 1 : -1;
  return new THREE.Vector3(
    Math.cos(angle) * radius * strand,
    t * height - height * 0.5,
    Math.sin(angle) * radius * strand
  );
}

// Scatter: random positions in a volume, seeded by index for consistency
export function scatterPositions(index: number, gridSize: number): THREE.Vector3 {
  const spread = (gridSize - 1) * GRID_SPACING * 1.5;
  // Deterministic pseudo-random based on index
  const hash = (n: number) => {
    let x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  return new THREE.Vector3(
    (hash(index * 3) - 0.5) * spread * 2,
    (hash(index * 3 + 1) - 0.5) * spread * 2,
    (hash(index * 3 + 2) - 0.5) * spread * 2
  );
}

// Pre-compute all positions for a shape
export function generateShapePositions(
  generator: ShapeGenerator,
  particleCount: number,
  gridSize: number
): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  for (let i = 0; i < particleCount; i++) {
    positions.push(generator(i, gridSize));
  }
  return positions;
}

export const SHAPE_GENERATORS: ShapeGenerator[] = [
  cubePositions,
  explodedPositions,
  spherePositions,
  helixPositions,
  scatterPositions,
];
