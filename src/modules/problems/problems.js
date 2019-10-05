const $container = $('.problems__items');
const $items = $('.problems__item');
const $texts = $('.problems__text');
const activeClass = 'problems__item--active';

$('.problems__panel').on('click', (e) => {
  $items.removeClass(activeClass);
  $texts.css({ 'max-height': ''});

  const $item = $(e.target).parents('.problems__item');
  $item.addClass(activeClass);
  const $text = $item.find('.problems__text');
  const $content = $item.find('.problems__content');

  $text.css('max-height', $content.outerHeight(true));
  const containerRect = $container[0].getBoundingClientRect();
  const contentRect = $content[0].getBoundingClientRect();
  if (contentRect.bottom > containerRect.bottom) $text.css('top', containerRect.height - contentRect.height);
});

$('.problems__panel').first().click();
