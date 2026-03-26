
$(function () {

  //모바일메뉴
  $('#headerWrap .mobileBtn').click(function () {
    $('#mobileMenuWrap').addClass('active');
    $('.mobilebg').fadeIn();
    $('body').addClass('mobileNoScroll');
  });

  $('#headerWrap .mobileCloseBtn').click(function () {
    $('#mobileMenuWrap').removeClass('active');
    $('.mobilebg').fadeOut('active');
    $('body').removeClass('mobileNoScroll');
  });

  $('#mobileMenuWrap .mobileDepth01 li h2 a').click(function () {
    if ($(this).hasClass('active')) {
      $('#mobileMenuWrap .mobileDepth01 > li > h2 > a').removeClass('active');
      $('#mobileMenuWrap .mobileDepth02').slideUp();
    } else {
      $('#mobileMenuWrap .mobileDepth01 > li > h2 > a').removeClass('active');
      $(this).addClass('active');
      $('#mobileMenuWrap .mobileDepth02').slideUp();
      $(this).parents('li').find('.mobileDepth02').slideDown();
    }
  });
  $('#mobileMenuWrap .mobileDepth01 li:has(ul)').children('h2').addClass('mobileMenu');

  //헤더 
  $('#headerWrap nav .depth01 li').mouseover(function () {
    $('#headerWrap').addClass('active');
    $('#headerWrap nav .depth02').stop().fadeIn();
    $('#headerWrap .bg').stop().slideDown();
  });
  $('#headerWrap .menu').mouseleave(function () {
    $('#headerWrap').removeClass('active');
    $('#headerWrap nav .depth02').stop().fadeOut();
    $('#headerWrap .bg').stop().slideUp();
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#headerWrap').addClass('scroll');
    } else {
      $('#headerWrap').removeClass('scroll');
    }
  });












  //비주얼영역 
  $(window).load(function () {
    $('#visualWrap .visualBox').addClass('active');
  });

  $('#visualWrap .slickWrap .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('#visualWrap .visualBox').removeClass('active');
  });
  $('#visualWrap .slickWrap .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    $('#visualWrap .visualBox').addClass('active');
  });

  $('#visualWrap .slickWrap .slick').slick({
    autoplay: false,
    arrows: false,
    dots: false,
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1000,
    pauseOnHover: false,
    autoplaySpeed: 5500,
    speed: 1300,
  });

  /* 푸터 */
  $('#footerWrap .consulting').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).next().slideUp();
    } else {
      $(this).addClass('active');
      $(this).next().slideDown();
    }
    return false;
  });





});
