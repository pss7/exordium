
$(function () {

  //로드
  $(window).load(function () {
    $('.subTopTitleBox').addClass('active');
  });

  //사업개요
  $('.overviewMainimg').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.overviewNavImg'
  });

  $('.overviewNavImg').slick({
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    asNavFor: '.overviewMainimg',
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