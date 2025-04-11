import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useEffect, useRef } from "react";

// Export GSAP and plugins for direct use
export { gsap, ScrollTrigger, ScrollToPlugin };

export function gsapInit() {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export function useGSAP(callback: (gsapInstance: typeof gsap) => void, dependencies: any[] = []) {
  useEffect(() => {
    // Always register plugins to be safe
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Create a GSAP context and pass the gsap instance to the callback
    let ctx = gsap.context(() => callback(gsap));
    return () => ctx.revert();
  }, dependencies);
}

export function useScrollTrigger(element: React.RefObject<HTMLElement>, options: ScrollTriggerOptions = {}) {
  useEffect(() => {
    if (!element.current) return;

    const trigger = ScrollTrigger.create({
      trigger: element.current,
      start: options.start || "top 85%",
      end: options.end || "bottom 15%",
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
      toggleActions: options.toggleActions || "play none none none",
      markers: options.markers || false,
      once: options.once || false
    });

    return () => {
      trigger.kill();
    };
  }, [element, options]);
}

type ScrollTriggerOptions = {
  start?: string;
  end?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  toggleActions?: string;
  markers?: boolean;
  once?: boolean;
};

export function useParallax(element: React.RefObject<HTMLElement>, intensity: number = 0.5) {
  useEffect(() => {
    if (!element.current) return;

    const handleParallax = () => {
      const scrollY = window.scrollY;
      const triggerPosition = element.current ? element.current.getBoundingClientRect().top + scrollY : 0;
      const offset = (scrollY - triggerPosition) * intensity;
      
      if (element.current) {
        gsap.to(element.current, {
          y: offset,
          ease: "none",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, [element, intensity]);
}

export function useRevealAnimation(element: React.RefObject<HTMLElement>, delay: number = 0) {
  useEffect(() => {
    if (!element.current) return;

    const animation = gsap.from(element.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay,
      paused: true,
      ease: "power3.out"
    });

    const trigger = ScrollTrigger.create({
      trigger: element.current,
      start: "top 85%",
      onEnter: () => animation.play(),
      once: true
    });

    return () => {
      animation.kill();
      trigger.kill();
    };
  }, [element, delay]);
}
