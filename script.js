// Tabs Content
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;
  //remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  //activate classes
  document
    .querySelector(`.operations__tab--${clicked.dataset.tab}`)
    .classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  //transition
  //   document.querySelector('.operations__content--active').style.transition =
  //     'all 4s';
});
//Reveal Section on scroll
const allSection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});
// lazy img
const imgTarget = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-300px',
});
imgTarget.forEach(img => imgObserver.observe(img));
// scroll navigatin and btn link
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  const s1Coordinates = section1.getBoundingClientRect();
  // console.log(s1Coordinates);
  // console.log(e.target.getBoundingClientRect());
  // console.log('currentScroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  //scrolling

  // window.scrollTo({
  //   left: s1Coordinates.left,
  //   top: s1Coordinates.top,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});
// modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsShowModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
//close modal
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsShowModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//slider
const slidesHeader = document.querySelectorAll('.showcase');
const btnLeftHeader = document.querySelector('.slide-box--1');
const btnRightheader = document.querySelector('.slide-box--2');

let currentSlideHeader = 0;
const maxSlideHeader = slidesHeader.length;

const goToSLideHeader = function (slideNum) {
  slidesHeader.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slideNum)}%)`;
  });
};

goToSLideHeader(0);
// next slide Header
const nextSlideHeader = function () {
  if (currentSlideHeader === maxSlideHeader - 1) {
    currentSlideHeader = 0;
  } else {
    currentSlideHeader++;
  }
  goToSLideHeader(currentSlideHeader);
};
//previous SLide Header
const previousSlideHeader = function () {
  if (currentSlideHeader === 0) {
    currentSlideHeader = maxSlideHeader - 1;
  } else {
    currentSlideHeader--;
  }
  goToSLideHeader(currentSlideHeader);
};

btnRightheader.addEventListener('click', nextSlideHeader);
btnLeftHeader.addEventListener('click', previousSlideHeader);

//

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let currentSlide = 0;
const maxSlide = slides.length;

const goToSlide = function (SlideNumber) {
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - SlideNumber)}%)`;
  });
};
// Initial Slide (0, 100,200,300)
goToSlide(0);

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};
const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

// question box
// const questionDescription = document.querySelectorAll('.question__box');
// console.log(questionDescription);
// const question = function () {
//   questionDescription.forEach(q => q.classList.add('open'));
// };
// const btn = document.querySelectorAll('.question__btn');
// btn.forEach(element => element.addEventListener('click', question));
