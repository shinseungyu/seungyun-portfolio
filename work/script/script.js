$(function () {
  // 스크롤 트리거 연결
  gsap.registerPlugin(ScrollTrigger);
  // header
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
      // wheel down
      headerArea.removeClass("scroll");
    } else {
      // wheel up
      headerArea.addClass("scroll");
    }
  });


  gsap.timeline({
    scrollTrigger: {
      trigger: '.section1',
      start: 'top top',
      end: '+=100%',
      scrub: 1,
      pin: true,

    }
  })
    .fromTo('.section1 .container .title .a',
      { x: '0%' },
      { x: '-210%', ease: 'none', duration: 5 }, 0)
    .fromTo('.section1 .container .title .b',
      { x: '0%' },
      { x: '210%', ease: 'none', duration: 5 }, 0);

  // AOS 초기화
  function initAOS() {
    const windowWidth = window.innerWidth;

    if (windowWidth > 1000) {
      setTimeout(() => {
        AOS.init({
          duration: 400,
          easing: 'ease-in-out',
        });
        // GSAP & AOS 충돌 방지를 위한 새로고침
        ScrollTrigger.refresh();
        AOS.refreshHard();
      }, 300);
    } else {
      // 1000px 이하일 때 AOS 완전 비활성화
      AOS.init({ disable: true });
      AOS.refresh();
    }
  }

  // 초기화 함수 호출
  initAOS();

  // 창 크기 변경 시 AOS 재설정
  $(window).resize(() => {
    initAOS();
  });

  // section3
  $(window).on('scroll', function () {
    const scrollTop = $(window).scrollTop();
    console.log(scrollTop);
    const sec3_wrap = $('.section3 .wrap-box').offset().top;
    const sec4 = $('.section4').offset().top;
    const foot = $('.footer').offset().top - 300;

    // section5 bg변경 코드
    const sec3Offset = $('.section3').offset().top - 500;
    const sec4Offset = $('.section4').offset().top - 500;
    const $body = $('body');
    if (scrollTop > sec3Offset && scrollTop < sec4Offset) {
      $body.addClass('bg');

    } else {
      $body.removeClass('bg');  // section5 밖으로 벗어날 때는 'bg' 클래스 제거
    }
    if (scrollTop >= sec3_wrap && scrollTop < sec4) {
      $('.section3 .container .left-con .left-txt').addClass('on');

    } else {
      $('.section3 .left-con .left-txt').removeClass('on');

    }

    if ($(window).width() < 1000) {
      $(".wrap").css("overflow", "hidden");  // 1000px 이하에서는 항상 스크롤 가능
    } else {
      if (scrollTop >= sec4 && scrollTop < foot) {
        $(".wrap").css("overflow", "visible");
      } else {
        $(".wrap").css("overflow", "hidden");
      }
    }

  });
  // section4 circle 
  gsap.timeline({
    scrollTrigger: {
      trigger: '.section4 .con1',
      start: '0% 50%',
      end: '30% 0%',
      scrub: 2,
    }
  })

    .fromTo('.section4 .con1 .circle', { 'width': '0', 'height': '0', 'duration': '10', 'ease': 'elastic' }, {
      'width': '2000px',
      'height': '2000px', 'duration': '10', 'opacity': '1'
    }, 0)

  gsap.timeline({
    scrollTrigger: {
      trigger: '.section4 .textBox',
      start: '0% 80%',
      end: '100% 80%',
      scrub: 1,
    }
  })
    .fromTo('.textBox', { 'duration': '5', 'ease': 'elastic', 'opacity': '0' }, {
      'duration': '5', 'ease': 'none', 'opacity': '1'
    }, 0)

  // pc, tablet, mobile open-window
  $('.open-window').on('click', function (e) {
    e.preventDefault();

    const url = $(this).attr('href');
    const width = $(this).data('width');
    const height = $(this).data('height');

    window.open(url, '_blank', `width=${width},height=${height}`);
  });
});
