import initSlider  from '../../js/initSlider';
import initGallery from '../../js/initGallery';

initSlider('.certificates__slider', {
  slidesPerView: 1,
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
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});

initGallery({
  $items: $('.certificates__item'),
});
