$(function () {
  $('.open-window').on('click', function (e) {
    e.preventDefault();

    const url = $(this).attr('href');
    const width = $(this).data('width');
    const height = $(this).data('height');

    window.open(url, '_blank', `width=${width},height=${height}`);
  });
})