import initSlider  from '../../js/initSlider';
import initGallery from '../../js/initGallery';

initGallery({
  $items: $('.certificates__item'),
});

initSlider('.certificates__slider', {
  slidesPerView: 2,
  spaceBetween:  10,
  loop:          true,
  wrapperClass:  'certificates__items',
  slideClass:    'certificates__item',
  navigation:    {
    prevEl: '.certificates__nav--prev',
    nextEl: '.certificates__nav--next',
  },
  breakpoints:   {
    768:  {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 6,
    },
  },
});
