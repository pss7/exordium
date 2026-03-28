$(function () {

  let $introVideoWrap = $('#introVideoWrap');
  let $introCursor = $('#introCursor');
  let $introSkip = $('.introSkip');
  let introVideo = document.getElementById('introVideo');
  let isIntroClosed = false;
  let rafId = null;

  let hasIntro = $introVideoWrap.length > 0;

  if (hasIntro) {
    $('body').addClass('introOpen');
  }

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let ease = 0.28;

  function isMobileIntro() {
    return window.innerWidth <= 1199;
  }

  function renderCursor() {
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;

    $introCursor.css(
      'transform',
      'translate3d(' + currentX + 'px, ' + currentY + 'px, 0)'
    );

    rafId = requestAnimationFrame(renderCursor);
  }

  function stopCursor() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function playOpeningMask() {
    let $mask = $('.openingMask');
    if (!$mask.length) return;

    $mask.addClass('active');

    setTimeout(function () {
      $mask.remove();
    }, 1300);
  }

  function closeIntro() {
    if (isIntroClosed) return;
    isIntroClosed = true;

    $('body').removeClass('introOpen');
    $introCursor.addClass('isPressed');
    $introVideoWrap.addClass('isHide');

    if (introVideo) {
      introVideo.pause();
    }

    setTimeout(function () {
      stopCursor();
      $introVideoWrap.remove();
      playOpeningMask();
    }, 400);
  }

  function bindDesktopIntro() {
    if (!hasIntro) return;

    targetX = window.innerWidth / 2;
    targetY = window.innerHeight / 2;
    currentX = targetX;
    currentY = targetY;

    renderCursor();

    $introVideoWrap.on('mousemove.intro', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      $introVideoWrap.addClass('isActive');
    });

    $introVideoWrap.on('mouseenter.intro', function () {
      $introVideoWrap.addClass('isActive');
    });

    $introVideoWrap.on('mousedown.intro', function () {
      $introCursor.addClass('isPressed');
    });

    $introVideoWrap.on('mouseup.intro mouseleave.intro', function () {
      $introCursor.removeClass('isPressed');
    });

    $introVideoWrap.on('click.intro', function (e) {
      // 모바일에서는 래퍼 클릭 무효
      if (isMobileIntro()) return;

      if ($(e.target).closest('.introSkip').length) return;
      closeIntro();
    });
  }

  function bindMobileIntro() {
    if (!hasIntro) return;

    $introVideoWrap.on('click.introMobileBlock', function (e) {
      if (!isMobileIntro()) return;

      // skip 버튼만 닫힘 허용
      if ($(e.target).closest('.introSkip').length) {
        e.preventDefault();
        e.stopPropagation();
        closeIntro();
        return false;
      }

      // 비디오/배경 클릭 막기
      e.preventDefault();
      e.stopPropagation();
      return false;
    });

    $introVideoWrap.on('touchstart.introMobileBlock', function (e) {
      if (!isMobileIntro()) return;

      if ($(e.target).closest('.introSkip').length) return;

      e.stopPropagation();
    });
  }

  function unbindIntroEvents() {
    if (!hasIntro) return;

    stopCursor();
    $introVideoWrap.off('.intro');
    $introVideoWrap.off('.introMobileBlock');
    $introVideoWrap.removeClass('isActive');
    $introCursor.removeClass('isPressed');
  }

  function setupIntroMode() {
    if (!hasIntro || isIntroClosed) return;

    unbindIntroEvents();

    if (isMobileIntro()) {
      bindMobileIntro();
    } else {
      bindDesktopIntro();
    }
  }

  if (hasIntro) {
    setupIntroMode();

    $introSkip.on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeIntro();
    });

    if (introVideo) {
      introVideo.addEventListener('ended', function () {
        closeIntro();
      });
    }

    $(window).on('resize', function () {
      setupIntroMode();
    });
  }

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  $(window).on('load', function () {
    $('html, body').scrollTop(0);

    if (!hasIntro) {
      playOpeningMask();
    }
  });

  // 새로고침 시 상단으로 이동
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  $(window).on('load', function () {
    $('html, body').scrollTop(0);

    // 인트로가 없을 때만 바로 오픈마스크 실행
    if (!hasIntro) {
      playOpeningMask();
    }
  });

  /* section04 */
  $('#section04 .slickWrap .slick').slick({
    slide: '.slider',
    autoplay: true,
    arrows: true,
    dots: false,
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1000,
    pauseOnHover: false,
    autoplaySpeed: 3000,
    speed: 1300,
    prevArrow: $('#section04 .control .prev'),
    nextArrow: $('#section04 .control .next'),
  });

  /* section06 */
  $('#section06 .floorGuideBox .slick').slick({
    slide: '.slider',
    autoplay: true,
    arrows: true,
    dots: false,
    accessibility: false,
    draggable: true,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1000,
    pauseOnHover: false,
    autoplaySpeed: 3000,
    speed: 1300,
    prevArrow: $('#section06 .floorGuideBox .control .prev'),
    nextArrow: $('#section06 .floorGuideBox .control .next'),
  });

  $('#section06 .spaceBox .slick').slick({
    slide: '.slider',
    autoplay: true,
    arrows: true,
    dots: false,
    accessibility: false,
    draggable: true,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1000,
    pauseOnHover: false,
    autoplaySpeed: 3000,
    speed: 1300,
    prevArrow: $('#section06 .spaceBox .control .prev'),
    nextArrow: $('#section06 .spaceBox .control .next'),
  });

  /* fullpage */
  let sec1Open = false;
  let sec3Open = false;
  let sec6Open = false;
  let busy = false;
  let current = 1;
  let firstLoad = true;

  function getSectionByIndex(index) {
    return $('.section').eq(index - 1);
  }

  function setActiveSection(index) {
    $('.section').removeClass('is-active');
    getSectionByIndex(index).addClass('is-active');
    console.log('active section index:', index, getSectionByIndex(index).attr('id'));
  }

  function resetSection03() {
    $('#section03').removeClass('step1 horizontalStep2');
    sec3Open = false;
  }

  function resetSection06() {
    $('#section06').removeClass('horizontalStep2');
    sec6Open = false;
  }

  $('#fullpage').fullpage({
    scrollingSpeed: 2000,
    navigation: false,
    fitToSection: true,
    autoScrolling: true,
    slideSelector: '.fpSlide',
    responsiveWidth: 1441,
    afterRender: function () {
      setTimeout(function () {
        setActiveSection(1);
        firstLoad = false;
      }, 120);
    },

    afterLoad: function (anchorLink, index) {
      current = index;

      setTimeout(function () {
        setActiveSection(index);

        if (index === 3 && !sec3Open) {
          $('#section03').addClass('step1');
        }

        if (index === 6) {
          $('#section06 .slick').slick('setPosition');
        }
      }, firstLoad ? 120 : 60);
    },

    onLeave: function (index, nextIndex, direction) {
      if (busy) return false;

      /* section01 */
      if (index === 1 && direction === 'down' && !sec1Open) {
        busy = true;
        $('#section01').addClass('on2');
        sec1Open = true;
        setActiveSection(1);

        setTimeout(function () {
          busy = false;
        }, 800);

        return false;
      }

      if (nextIndex === 1) {
        $('#section01').removeClass('on2');
        sec1Open = false;
      }

      /* section03 */
      if (index === 3 && direction === 'down' && !sec3Open) {
        busy = true;
        $('#section03').removeClass('step1').addClass('horizontalStep2');
        sec3Open = true;
        setActiveSection(3);

        setTimeout(function () {
          busy = false;
        }, 800);

        return false;
      }

      if (index === 4 && nextIndex === 3 && direction === 'up') {
        $('#section03').removeClass('step1').addClass('horizontalStep2');
        sec3Open = true;

        setTimeout(function () {
          setActiveSection(3);
        }, 60);
      }

      if (index === 2 && nextIndex === 3 && direction === 'down') {
        resetSection03();

        setTimeout(function () {
          $('#section03').addClass('step1');
          setActiveSection(3);
        }, 150);
      }

      /* section06 */
      if (index === 6 && direction === 'down' && !sec6Open) {
        busy = true;
        $('#section06').addClass('horizontalStep2');
        sec6Open = true;
        setActiveSection(6);

        setTimeout(function () {
          $('#section06 .slick').slick('setPosition');
          busy = false;
        }, 800);

        return false;
      }

      if (index === 7 && nextIndex === 6 && direction === 'up') {
        $('#section06').addClass('horizontalStep2');
        sec6Open = true;

        setTimeout(function () {
          $('#section06 .slick').slick('setPosition');
          setActiveSection(6);
        }, 60);
      }

      if (index === 5 && nextIndex === 6 && direction === 'down') {
        resetSection06();

        setTimeout(function () {
          $('#section06 .slick').slick('setPosition');
          setActiveSection(6);
        }, 60);
      }
    }
  });

  $('#section01').on('mousewheel DOMMouseScroll', function (e) {
    if (current !== 1 || !sec1Open || busy) return;

    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;

    if (delta > 0) {
      busy = true;
      $('#section01').removeClass('on2');
      sec1Open = false;
      setActiveSection(1);

      setTimeout(function () {
        busy = false;
      }, 800);

      return false;
    }
  });

  $('#section03').on('mousewheel DOMMouseScroll', function (e) {
    if (current !== 3 || !sec3Open || busy) return;

    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;

    if (delta > 0) {
      busy = true;
      $('#section03').removeClass('horizontalStep2');
      sec3Open = false;
      setActiveSection(3);

      setTimeout(function () {
        $('#section03').addClass('step1');
        busy = false;
      }, 150);

      return false;
    }
  });

  $('#section06').on('mousewheel DOMMouseScroll', function (e) {
    if (current !== 6 || !sec6Open || busy) return;

    var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;

    if (delta > 0) {
      busy = true;
      $('#section06').removeClass('horizontalStep2');
      sec6Open = false;
      setActiveSection(6);

      setTimeout(function () {
        $('#section06 .slick').slick('setPosition');
        busy = false;
      }, 800);

      return false;
    }
  });

});