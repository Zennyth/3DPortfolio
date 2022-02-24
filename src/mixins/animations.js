import gsap from "gsap";

export default {
  methods: {
    fadeUpIndexOnBeforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = "translateY(100px)";
    },
    fadeUpIndexOnEnter(el, done) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        onComplete: done,
        delay: el.dataset.index * 0.2,
      });
    }
  }
};