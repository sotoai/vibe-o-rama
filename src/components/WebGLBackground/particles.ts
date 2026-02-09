import * as THREE from 'three';
import { CUBE_SIZE, COLORS, SCROLL_BREAKPOINTS, AMBIENT_ROTATION_SPEED, FLOAT_AMPLITUDE, FLOAT_SPEED, DeviceConfig } from './constants';
import { generateShapePositions, SHAPE_GENERATORS } from './morphTargets';

export interface ParticleSystem {
  mesh: THREE.InstancedMesh;
  shapePositions: THREE.Vector3[][];
  pivotGroup: THREE.Group;
  update: (progress: number, elapsed: number) => void;
  dispose: () => void;
}

export function createParticles(
  scene: THREE.Scene,
  config: DeviceConfig
): ParticleSystem {
  const { gridSize, particleCount } = config;

  // Geometry — actual 3D cubes
  const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);

  // Material — dark purple with emissive glow
  const material = new THREE.MeshStandardMaterial({
    color: COLORS.materialBase,
    emissive: COLORS.emissive,
    emissiveIntensity: 0.15,
    roughness: 0.4,
    metalness: 0.6,
  });

  // InstancedMesh — single draw call
  const mesh = new THREE.InstancedMesh(geometry, material, particleCount);

  // Per-instance colors: cyan (bottom) to purple (top)
  const colorBottom = new THREE.Color(COLORS.gradientBottom);
  const colorTop = new THREE.Color(COLORS.gradientTop);
  const colorArray = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const y = Math.floor(i / gridSize) % gridSize;
    const t = y / (gridSize - 1);
    const color = new THREE.Color().lerpColors(colorBottom, colorTop, t);
    colorArray[i * 3] = color.r;
    colorArray[i * 3 + 1] = color.g;
    colorArray[i * 3 + 2] = color.b;
  }
  mesh.instanceColor = new THREE.InstancedBufferAttribute(colorArray, 3);

  // Pre-compute all shape positions
  const shapePositions = SHAPE_GENERATORS.map((gen) =>
    generateShapePositions(gen, particleCount, gridSize)
  );

  // Set initial cube positions
  const dummy = new THREE.Object3D();
  for (let i = 0; i < particleCount; i++) {
    const pos = shapePositions[0][i];
    dummy.position.copy(pos);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;

  // Pivot group for rotation
  const pivotGroup = new THREE.Group();
  pivotGroup.add(mesh);
  scene.add(pivotGroup);

  // Scratch objects for per-frame interpolation
  const tempMatrix = new THREE.Matrix4();
  const tempPos = new THREE.Vector3();
  const tempQuat = new THREE.Quaternion();
  const tempScale = new THREE.Vector3(1, 1, 1);

  function update(progress: number, elapsed: number) {
    const bp = SCROLL_BREAKPOINTS;

    // Determine which two shapes we're interpolating between
    let shapeA = 0;
    let shapeB = 0;
    let t = 0;

    if (progress <= bp.cubeEnd) {
      // Idle cube
      shapeA = 0;
      shapeB = 0;
      t = 0;
    } else if (progress <= bp.explodedEnd) {
      // Cube → Exploded
      shapeA = 0;
      shapeB = 1;
      t = (progress - bp.cubeEnd) / (bp.explodedEnd - bp.cubeEnd);
    } else if (progress <= bp.sphereEnd) {
      // Exploded → Sphere
      shapeA = 1;
      shapeB = 2;
      t = (progress - bp.explodedEnd) / (bp.sphereEnd - bp.explodedEnd);
    } else if (progress <= bp.helixEnd) {
      // Sphere → Helix
      shapeA = 2;
      shapeB = 3;
      t = (progress - bp.sphereEnd) / (bp.helixEnd - bp.sphereEnd);
    } else {
      // Helix → Scatter
      shapeA = 3;
      shapeB = 4;
      t = (progress - bp.helixEnd) / (bp.scatterEnd - bp.helixEnd);
    }

    // Smooth easing
    t = Math.max(0, Math.min(1, t));
    t = t * t * (3 - 2 * t); // smoothstep

    const posA = shapePositions[shapeA];
    const posB = shapePositions[shapeB];

    // Fade out opacity in final 10%
    const fadeOpacity = progress > 0.9
      ? 1 - (progress - 0.9) / 0.1
      : 1;

    // Compute scale for fade
    const fadeScale = fadeOpacity;

    for (let i = 0; i < particleCount; i++) {
      // Lerp between shapes
      tempPos.lerpVectors(posA[i], posB[i], t);

      // Add organic floating offset
      const floatOffset = Math.sin(elapsed * FLOAT_SPEED + i * 0.3) * FLOAT_AMPLITUDE;
      tempPos.y += floatOffset;
      tempPos.x += Math.cos(elapsed * FLOAT_SPEED * 0.7 + i * 0.5) * FLOAT_AMPLITUDE * 0.5;

      tempScale.setScalar(fadeScale);
      tempMatrix.compose(tempPos, tempQuat, tempScale);
      mesh.setMatrixAt(i, tempMatrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // Ambient rotation
    pivotGroup.rotation.y = elapsed * AMBIENT_ROTATION_SPEED;
    pivotGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.1;
  }

  function dispose() {
    geometry.dispose();
    material.dispose();
    scene.remove(pivotGroup);
  }

  return { mesh, shapePositions, pivotGroup, update, dispose };
}
