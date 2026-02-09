'use client';

import { useEffect, useRef } from 'react';

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip if reduced motion is preferred
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationId: number;
    let disposed = false;

    // Dynamic imports to avoid SSR issues with Three.js
    async function init() {
      const [
        { DESKTOP_CONFIG, MOBILE_CONFIG, MOBILE_BREAKPOINT },
        { createScene, handleResize },
        { createParticles },
        { createScrollAnimation, disposeScrollAnimation },
      ] = await Promise.all([
        import('./constants'),
        import('./scene'),
        import('./particles'),
        import('./scrollAnimation'),
      ]);

      if (disposed) return;

      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const config = isMobile ? MOBILE_CONFIG : {
        ...DESKTOP_CONFIG,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      };

      const ctx = createScene(canvas!, config);
      const particles = createParticles(ctx.scene, config);
      const scrollState = { progress: 0 };
      const scrollTrigger = createScrollAnimation(scrollState);

      const clock = { start: performance.now() };
      let isVisible = true;

      // Visibility change handler
      function onVisibilityChange() {
        isVisible = !document.hidden;
        if (isVisible && !disposed) {
          animate();
        }
      }
      document.addEventListener('visibilitychange', onVisibilityChange);

      // Resize handler
      function onResize() {
        handleResize(ctx);
      }
      window.addEventListener('resize', onResize);

      // Render loop
      function animate() {
        if (disposed || !isVisible) return;
        animationId = requestAnimationFrame(animate);

        const elapsed = (performance.now() - clock.start) / 1000;
        particles.update(scrollState.progress, elapsed);
        ctx.renderer.render(ctx.scene, ctx.camera);
      }
      animate();

      // Store cleanup in the outer scope
      return () => {
        disposed = true;
        cancelAnimationFrame(animationId);
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.removeEventListener('resize', onResize);
        disposeScrollAnimation(scrollTrigger);
        particles.dispose();
        ctx.renderer.dispose();
      };
    }

    let cleanup: (() => void) | undefined;
    init().then((fn) => {
      cleanup = fn;
    }).catch((err) => {
      console.warn('[WebGLBackground] Failed to initialize:', err);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="webgl-canvas"
      aria-hidden="true"
    />
  );
}
