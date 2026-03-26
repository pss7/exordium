
$(function () {



  $(window).on('load', function () {
    $('.subTopTitleBox').addClass('active');
  });

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




});