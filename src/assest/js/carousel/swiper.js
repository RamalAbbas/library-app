
const swiper = new Swiper(".swiper", {
    //   speed: 400,
    //   spaceBetween: 100,
  
    direction: "horizontal",
    loop: true,
    speed: 800,
    slidesPerView: 2,
    slidesPerGroup: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      dragClass: "swiper-scrollbar-drag",
    },
    hideOnClick: false,
    delay: 2000,
  
    centerInsufficientSlides: true,
  
    //!   breakpoints
  
    breakpoints: {
      375: {
        slidesPerView: 1,
      },
      558: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 5,
      },
    },
  });
  