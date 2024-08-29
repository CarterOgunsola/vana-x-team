import { initGenAnimations } from "../animations/general";
import { initHomeAnimations } from "../animations/home";

// General scripts that should run on all pages
const initGeneralScripts = () => {
  console.log("General scripts initialized");
  initGenAnimations();
};

//get the current page's path
const getPagePath = () => {
  return window.location.pathname;
};

export const initAll = () => {
  const path = getPagePath();

  // Initialize general scripts for all pages
  initGenAnimations();

  // Conditional initialization based on page path
  if (path.includes("/")) {
    initHomeAnimations();
  } else if (path.includes("/aurora-cohorts")) {
    //initAuroraCohortsAnimations();
  } else if (path.includes("/events")) {
    //initEventsAnimations();
  }

  // Add other conditional page initializations here
};
