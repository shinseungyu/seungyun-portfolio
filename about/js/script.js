$(function () {
  gsap.registerPlugin(ScrollTrigger);

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


  gsap.timeline({
    scrollTrigger: {
      trigger: '.section1',
      start: 'top top',
      end: '+=100%',
      scrub: 1,
      pin: true,
    }
  })
    .fromTo('.section1 .imgBox img',
      { 'transform': 'rotateY(-40deg) rotateX(50deg)', 'width': '40%', 'opacity': 0.2 },  // 시작 상태
      { 'transform': 'rotateY(0deg) rotateX(0deg)', 'width': '100%', 'opacity': 1, duration: 3 })  // 끝 상태, duration을 3초로 설정

    .fromTo('.section1',
      { backgroundColor: '#222' },
      { backgroundColor: '#BBBBBD', duration: 3 })
    .fromTo('.section1 .text_box',
      { opacity: 0 },
      { opacity: 1, duration: 3 }
    );


  gsap.fromTo(".section2 .line #svgAni01",
    { strokeDashoffset: 2424 },
    {
      strokeDashoffset: 0,
      duration: 5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".section2",
        start: "top bottom",
        toggleActions: "play none none reverse"
      }
    }
  );
  // aos section2
  function initAOS() {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1024) {
      // 1024px 이상에서만 AOS 실행
      setTimeout(() => {
        AOS.init({
          duration: 400,
          easing: 'ease-in-out',
        });
        ScrollTrigger.refresh();
        AOS.refreshHard();
      }, 300);
    } else {
      // 1024px 미만에서는 AOS 완전 비활성화
      AOS.init({ disable: true });
      AOS.refresh();
    }
  }
  // 초기화 함수 호출
  initAOS();

  $(window).resize(() => {
    initAOS();
  });

  // section3 가로스크롤
  ScrollTrigger.matchMedia({
    "(min-width: 1025px)": function () {

      let list = gsap.utils.toArray('.section3 .list li');
      let listA = gsap.utils.toArray('.section3 .list .a');
      let listB = gsap.utils.toArray('.section3 .list .b');
      let listC = gsap.utils.toArray('.section3 .list .c');
      let sec4bg = gsap.utils.toArray('body')

      let scrollTween = gsap.to(list, {
        xPercent: -100 * (list.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.section3',
          pin: true,
          scrub: 1,
          start: 'center center',
          end: '200%',
        }
      });
      gsap.to(listA, {
        y: 50,
        rotation: 10,
        scrollTrigger: {
          trigger: '.section3',
          scrub: 2,
          end: '200%'
        }
      })
      gsap.to(listB, {
        y: -50,
        rotation: 20,
        scrollTrigger: {
          trigger: '.section3',
          scrub: 2,
          end: '200%'
        }
      })
      gsap.to(listC, {
        y: 50,
        x: 20,
        rotation: -10,
        scrollTrigger: {
          trigger: '.section3',
          scrub: 2,
          end: '200%'
        }
      })
      gsap.to(sec4bg, {
        backgroundColor: "#222", // 배경색 변경
        scrollTrigger: {
          trigger: '.section3',
          scrub: 2,
          end: '200%'
        }
      });
    }
  })
})