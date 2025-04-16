$(function () {
  AOS.init();

  const $menuBtn = $('#hamburger');
  const $mainMenu = $('.main_menu');

  $menuBtn.on('click', function () {
    $(this).toggleClass('active');

    // active 클래스 여부에 따라 mainMenu 클래스 추가/제거
    if ($(this).hasClass('active')) {
      $mainMenu.addClass('active');
    } else {
      $mainMenu.removeClass('active');
    }
  });
  $(window).on("wheel", function (event) {
    const headerArea = $(".header_area");

    if (event.originalEvent.deltaY > 0) {
      headerArea.removeClass("scroll");
    } else {
      headerArea.addClass("scroll");
    }
  });

});