// core version + navigation, pagination modules:
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import gsap from "gsap";

const updateActiveNavEl = () => {
  // Remove child from all bullets
  document
    .querySelectorAll(".swiper-pagination-bullet-active")
    .forEach(function (bullet) {
      while (bullet.firstChild) {
        // bullet.removeChild(bullet.firstChild);
        bullet.classList.remove("swiper-pagination-bullet-active");
      }
    });

  // const childElement = document.createElement("span");
  // childElement.classList.add("swiper-pagination-bullet__inner");

  // Append the child element to the active bullet
  // const activeBullet = document.querySelector(
  //   ".swiper-pagination-bullet-active"
  // );
  // if (activeBullet) {
  //   activeBullet.appendChild(childElement);
  // }
};

const controlInitialSliderUI = () => {
  const sliderPaginationCtrl = document.querySelector(".dlp-page-control");
  const sliderPageStatus = document.querySelector(".status");

  const ctrlTL = gsap.timeline();

  ctrlTL
    .to(sliderPaginationCtrl, {
      opacity: 1,
      y: "0%",
      duration: 0.4,
      ease: "power2.in",
    })
    .to(sliderPageStatus, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.in",
    });
};

// init Swiper:
export const swiperInit = () => {
  return new Swiper(".swiper", {
    spaceBetween: 30,
    effect: "fade",

    autoplay: true,

    modules: [Navigation, Pagination],

    speed: 400,

    // Optional parameters
    direction: "horizontal",
    // loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    on: {
      init: function () {
        controlInitialSliderUI();
        updateActiveNavEl();
      },

      slideChange: function () {
        updateActiveNavEl();
      },
    },
  });
};
