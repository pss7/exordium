
$(function () {

  //스크롤
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#headerWrap').addClass('scroll');
    } else {
      $('#headerWrap').removeClass('scroll');
    }
  });

  //로드
  $(window).load(function () {
    $('.subTopTitleBox').addClass('active');
    AOS.init({
      duration: 2000
    });
  });

  //썸네일 슬라이드
  $('.slideMainImg').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.slideNavImg'
  });

  $('.slideNavImg').slick({
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    asNavFor: '.slideMainImg',
    focusOnSelect: true,
    variableWidth: true,
    swipeToSlide: true
  });

  //탭
  $('.tabContent').hide();
  $('.tabContent').first().show();

  $('.tabList li').click(function () {

    $('.tabList li .tabBtn').removeClass('active');
    $(this).children('.tabBtn').addClass('active')

    let idx = $(this).index();

    $('.tabContent').hide();
    $('.tabContent').eq(idx).show();

  });


});