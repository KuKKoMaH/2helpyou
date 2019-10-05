$('.tabs__header').on('click', (e) => {
  const $item   = $(e.currentTarget);
  const index   = $item.index();
  const $parent = $item.parents('.tabs');

  const $items = $parent.find('.tabs__item');
  $items.removeClass('tabs__item--active');
  $items.eq(index).addClass('tabs__item--active');

  const $headers = $parent.find('.tabs__header');
  $headers
    .removeClass('tabs__header--active')
    .removeClass('btn--active');
  $item
    .addClass('tabs__header--active')
    .addClass('btn--active');
});