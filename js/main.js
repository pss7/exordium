
$(function () {

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
  $('#section06 .slickWrap .slick').slick({
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
    prevArrow: $('#section06 .control .prev'),
    nextArrow: $('#section06 .control .next'),
  });

  /* fullpage */
  var sec1Open = false;
  var sec3Open = false;
  var sec6Open = false;
  var busy = false;
  var current = 1;
  var firstLoad = true;

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
    responsiveWidth:1441,
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
