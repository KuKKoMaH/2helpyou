module.exports = (props) => $.magnificPopup.open({
  // closeMarkup:  '<button class="popup__close mfp-close">ЗАКРЫТЬ <svg class="popup__close-icon"><use xlink:href="#close"></use></svg></button>',
  removalDelay: 200,
  type:         'inline',
  ...props,
  callbacks:    {
    // beforeOpen:  () => $('.page').addClass('mfp-body-open'),
    // beforeClose: () => $('.page').removeClass('mfp-body-open'),
    ...props.callbacks,
  },
});