import * as THREE from 'three';
import { COLORS, CAMERA_Z, DeviceConfig } from './constants';

export interface SceneContext {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
}

export function createScene(
  canvas: HTMLCanvasElement,
  config: DeviceConfig
): SceneContext {
  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: config.antialias,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(config.pixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, CAMERA_Z);

  // Lighting — 3-light cinematic rig
  // Key light: purple from upper-right
  const keyLight = new THREE.PointLight(COLORS.keyLight, 2, 20);
  keyLight.position.set(4, 4, 4);
  scene.add(keyLight);

  // Fill light: cyan from lower-left
  const fillLight = new THREE.PointLight(COLORS.fillLight, 1.2, 20);
  fillLight.position.set(-4, -3, 2);
  scene.add(fillLight);

  // Rim light: soft white from behind
  const rimLight = new THREE.PointLight(COLORS.rimLight, 0.6, 20);
  rimLight.position.set(0, 2, -5);
  scene.add(rimLight);

  // Subtle ambient for minimum visibility
  const ambient = new THREE.AmbientLight(0x1a0a2e, 0.3);
  scene.add(ambient);

  return { renderer, scene, camera };
}

export function handleResize(ctx: SceneContext) {
  const { renderer, camera } = ctx;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
