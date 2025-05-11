
$(document).on('click', 'a[href="#"]', function (e) { e.preventDefault(); })
$(function () {
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
  // gsap 등록
  gsap.registerPlugin(ScrollTrigger)
  // section1
  // 01 스크롤될때 고정이되면서 h1이 투명했다가 나타나게
  gsap.timeline({
    scrollTrigger: {
      trigger: '.section1',
      start: 'top top',
      end: 'bottom top',
      pin: true,
      scrub: 1,
    }
  })
    .to('.section1 .text-box', { 'opacity': '1', 'ease': 'none', 'duration': '10' }, 5)
    .to('.section1 .textLoop', { 'opacity': '0', 'ease': 'none', 'duration': '10' }, 5)
  // 슬라이드 함수
  function slide() {
    let moveHeight = window.innerWidth <= 376 ? 40 :
      window.innerWidth <= 900 ? 70 :
        window.innerWidth <= 1200 ? 100 : 100;
    $(".right-txt-box ul").animate({ top: `-${moveHeight}px` }, 2000, function () {
      $(".right-txt-box ul").append($(".right-txt-box ul li").first());
      $(".right-txt-box ul").css({ top: 0 });
    });
  }
  // 슬라이드 함수 호출
  setInterval(slide, 4000);
  // section2
  gsap.fromTo('.textBox .mask span', 
    {
    'background-size': '0% 100%'
  }, {
    'background-size': '100% 100%',
    scrollTrigger: {
      trigger: '.textBox',
      pinnedContainer: '.textBox',
      start: '0% 100%',
      scrub: 3
    }
  });
  // section3 탭메뉴 연결
  $('.box').click(function () {
    var activeTab = $(this).attr('data-tab');
    // active는 그레이스케일을 위해 사용
    $('.box').removeClass('active');
    $('.con').removeClass('active');
    $(this).addClass('active');
    $('#' + activeTab).addClass('active');
  })
  // section4 swiper
  var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  // section5 
  ScrollTrigger.matchMedia({
    "(min-width: 1025px)": function () {
      let list = gsap.utils.toArray('.section5 ul li')
      let scrollTween = gsap.to(list, {
        xPercent: -100 * (list.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: ".section5",
          pin: true,
          scrub: 1,
          start: 'center center',
          end: '300%',

        }
      });
      gsap.utils.toArray('.imgBox').forEach(function (imgBox) {
        gsap.timeline({
          scrollTrigger: {
            trigger: imgBox,
            containerAnimation: scrollTween,
            start: 'center right',
            end: 'center center',
            scrub: true,
          }
        })
          .to(imgBox, { 'clip-path': 'inset(0%)', ease: 'none', duration: 1 }, 0)
        gsap.timeline({
          scrollTrigger: {
            trigger: imgBox,
            containerAnimation: scrollTween,
            start: 'center center',
            end: 'center left',
            scrub: true,
          }
        })
          .to(imgBox, { 'clip-path': 'inset(30%)', ease: 'none', duration: 1 }, 0)
      });
      gsap.utils.toArray('.section5 ul li a .textBox').forEach(function (textBox) {
        // 첫 번째 타임라인
        gsap.timeline({
          scrollTrigger: {
            trigger: textBox,
            containerAnimation: scrollTween,
            start: 'center 70%',
            end: 'center 40%',
            scrub: true,
          }
        })
          .to(textBox, { opacity: 1, x: -100 }, 0);
        // 두 번째 타임라인
        gsap.timeline({
          scrollTrigger: {
            trigger: textBox,
            containerAnimation: scrollTween,
            start: 'center 30%',
            end: 'center 20%',
            scrub: true,
          }
        })
          .to(textBox, { opacity: 0 }, 0);
        // 카운트 
        gsap.utils.toArray('.num').forEach(function (text) {
          // data-text 속성 값을 가져옴
          let num = text.getAttribute('data-text');
          let counter = document.querySelector('.counter .now');

          ScrollTrigger.create({
            trigger: text,
            start: '0% center',
            end: '100% center',
            scrub: true,
            containerAnimation: scrollTween,
            // 스크롤 위치가 start를 지나 앞으로 이동할 때 num 값을 counter에 설정
            onEnter: () => counter.innerText = num,
            // 스크롤 위치가 end를 지나 뒤로 이동할 때 num 값을 counter에 설정
            onEnterBack: () => counter.innerText = num
          });
        });
      });
    }
  })
});