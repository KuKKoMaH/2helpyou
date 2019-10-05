import openPopup from '../../js/openPopup';

window.showThank = () => openPopup({ items: { src: '#thank' } });

$('.popup__opener').on('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  openPopup({ items: { src: $(e.delegateTarget).attr('href') } });
  return false;
});

$('#thank .btn').on('click', () => $.magnificPopup.close());
