import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollState {
  progress: number;
}

export function createScrollAnimation(state: ScrollState): ScrollTrigger {
  const trigger = ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5,
    onUpdate: (self) => {
      state.progress = self.progress;
    },
  });

  return trigger;
}

export function disposeScrollAnimation(trigger: ScrollTrigger) {
  trigger.kill();
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
