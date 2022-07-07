'use strict';

/**
 * All Variables
 */
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const navContainer = document.querySelector('.header__lists');
const navLinks = document.querySelectorAll('.header__link');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');

/**
 * Modal Window
 */
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnOpenModal.forEach(btn => {
  btn.addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
});

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log(e);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/**
 * Tabs Components
 */

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  // Remove active buttons
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  // Activate Clicked button
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });
  // Activate Content of clicked element
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/**
 * Animation Fade in
 */

const navigationFadeIn = function (e) {
  const link = e.target;

  if (!link.classList.contains('header__link')) return;

  const siblingElements = link
    .closest('.header__nav')
    .querySelectorAll('.header__link');

  siblingElements.forEach(sibling => {
    if (link !== sibling) {
      sibling.style.opacity = this;
    }
  });
};
navContainer.addEventListener('mouseover', navigationFadeIn.bind(0.5));

navContainer.addEventListener('mouseout', navigationFadeIn.bind(1));
/**
 * Scrolling into a Section
 */

btnScrollTo.addEventListener('click', function (e) {
  // const s1Coords = section1.getBoundingClientRect();
  // const btnCoords = this.getBoundingClientRect();
  // console.log(btnCoords);
  // console.log(s1Coords);

  // console.log(window.pageXOffset);
  // console.log(window.pageYOffset);

  // section1
  // window.scrollTo({
  //   left: s1Coords.left,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // console.log(document.documentElement.clientHeight);
  // console.log(document.documentElement.clientWidth);

  section1.scrollIntoView({ behavior: 'smooth' });
});

/**
 * Scrolling a Section
 */

navContainer.addEventListener('click', function (e) {
  e.preventDefault();
  // const clickedLink = e.target;
  if (e.target.classList.contains('header__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/**
 * Slider Component
 */
const heroEl = document.querySelector('.section-hero');
const testimonials = document.querySelector('.section-testimonials');

const sliderComponent = function (parentEL) {
  const parentElement = document
    .querySelector(`.${parentEL}`)
    .querySelector(`.dots`);
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll(`.${parentEL} .slide`);
  const btnLeft = document.querySelector(`.${parentEL} .slider__btn--left`);
  const btnRight = document.querySelector(`.${parentEL} .slider__btn--right`);
  let dotContainer;
  if (parentElement) {
    dotContainer = document.querySelector(`.${slider.classList[0]} > .dots`);
  }
  console.log(dotContainer);

  let curSlide = 0;
  const maxSlide = slides.length;
  console.log(maxSlide);

  const createDots = function () {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `
      <button class="dots__dot" data-slide="${index}"></button>
      `
      );
    });
  };

  const activateDots = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlides = function (currrentSlide) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currrentSlide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlides(curSlide);
    activateDots(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlides(curSlide);
    activateDots(curSlide);
  };

  // initializer Function
  const init = function () {
    if (dotContainer) {
      createDots();
      activateDots(0);
    }
    goToSlides(0);
  };
  init();

  // Event Listeners
  btnLeft.addEventListener('click', prevSlide);

  btnRight.addEventListener('click', nextSlide);

  document.addEventListener('keydown', function (e) {
    // only works with 'keydown' & 'keyup' Events, but Not works with 'keypress' Events.
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });
  if (dotContainer) {
    dotContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        goToSlides(slide);
        activateDots(slide);
      }
    });
  }
};

sliderComponent(heroEl.classList[1]);
sliderComponent(testimonials.classList[1]);
