import gsap from "gsap";
import SplitType from "split-type";

export function initNav() {
  const elements = {
    mainWrap: document.querySelector('[data-drop-nav="main-wrap"]'),
    mainLink: document.querySelector('[data-drop-nav="main-link"]'),
    childWrap: document.querySelector('[data-drop-nav="child-wrap"]'),
    childLinks: document.querySelectorAll('[data-drop-nav="child-link"]'),
  };

  // Check if essential elements exist
  if (
    !elements.mainWrap ||
    !elements.mainLink ||
    !elements.childWrap ||
    elements.childLinks.length === 0
  ) {
    //console.warn("Navigation elements not found in the DOM.");
    return;
  }

  const animationSettings = {
    duration: 0.6,
    ease: "expo.out",
    stagger: 0.05,
  };

  const state = {
    isOpen: false,
    isAnimating: false,
  };

  function setState(newState) {
    Object.assign(state, newState);
    updateUI();
  }

  function updateUI() {
    if (elements.mainLink) {
      elements.mainLink.setAttribute("aria-expanded", state.isOpen);
      elements.childWrap.setAttribute("aria-hidden", !state.isOpen);
    }
  }

  function setInitialStates() {
    gsap.set(elements.childWrap, {
      y: 50,
      opacity: 0,
      visibility: "hidden",
      pointerEvents: "none",
    });
    gsap.set(elements.childLinks, {
      y: 105,
      opacity: 0,
    });
    console.log("About to updateUI");
    updateUI();
  }

  function openDropdown() {
    if (state.isAnimating || state.isOpen) return;
    setState({ isAnimating: true });

    const tl = gsap.timeline({
      onComplete: () => setState({ isAnimating: false, isOpen: true }),
    });

    tl.set(elements.childWrap, { visibility: "visible", pointerEvents: "auto" })
      .to(elements.childWrap, {
        y: 0,
        opacity: 1,
        duration: animationSettings.duration,
        ease: animationSettings.ease,
      })
      .to(
        elements.childLinks,
        {
          y: 0,
          opacity: 1,
          duration: animationSettings.duration,
          ease: animationSettings.ease,
          stagger: animationSettings.stagger,
        },
        "<"
      );
  }

  function closeDropdown() {
    if (state.isAnimating || !state.isOpen) return;
    setState({ isAnimating: true });

    const tl = gsap.timeline({
      onComplete: () => setState({ isAnimating: false, isOpen: false }),
    });

    tl.to(elements.childLinks, {
      y: 105,
      opacity: 0,
      duration: animationSettings.duration,
      ease: animationSettings.ease,
      stagger: -animationSettings.stagger,
    })
      .to(
        elements.childWrap,
        {
          y: 50,
          opacity: 0,
          duration: animationSettings.duration,
          ease: animationSettings.ease,
        },
        "<"
      )
      .set(elements.childWrap, { visibility: "hidden", pointerEvents: "none" });
  }

  function toggleDropdown() {
    if (state.isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  function handleMainLinkClick(event) {
    event.preventDefault();
    toggleDropdown();
  }

  function handleMainWrapLeave() {
    if (state.isOpen) {
      closeDropdown();
    }
  }

  function handleDocumentClick(event) {
    if (state.isOpen && !elements.mainWrap.contains(event.target)) {
      closeDropdown();
    }
  }

  // Initialize dropdown
  setInitialStates();
  elements.mainLink.addEventListener("click", handleMainLinkClick);
  elements.mainWrap.addEventListener("mouseleave", handleMainWrapLeave);
  document.addEventListener("click", handleDocumentClick);

  // Nav link animations
  const navLinks = document.querySelectorAll('[data-nav="link"]');

  navLinks.forEach((link) => {
    const text = link.querySelector('[data-nav="text"]');
    const line = link.querySelector('[data-nav="line"]');

    // Split text into characters
    const splitText = new SplitType(text, { types: "chars" });

    // Set initial state for the line
    gsap.set(line, { width: "0%" });

    // Create shimmer animation
    function shimmerEffect() {
      gsap.to(splitText.chars, {
        opacity: 0.2,
        stagger: {
          each: 0.03,
          onComplete: function () {
            gsap.to(this.targets(), { opacity: 1, duration: 0.1 });
          },
        },
        duration: 0.1,
      });
    }

    // Create line animation
    const lineTl = gsap.timeline({ paused: true });
    lineTl.to(line, {
      width: "100%",
      duration: 0.3,
      ease: "expo.out",
    });

    // Add event listeners
    link.addEventListener("mouseenter", () => {
      shimmerEffect();
      lineTl.play();
    });

    link.addEventListener("mouseleave", () => {
      lineTl.reverse();
    });
  });

  // Clean up function
  return function cleanup() {
    elements.mainLink.removeEventListener("click", handleMainLinkClick);
    elements.mainWrap.removeEventListener("mouseleave", handleMainWrapLeave);
    document.removeEventListener("click", handleDocumentClick);

    // Clean up nav link animations
    navLinks.forEach((link) => {
      link.removeEventListener("mouseenter", null);
      link.removeEventListener("mouseleave", null);
    });
  };
}
