import $ from 'jquery';
import './slick-animation';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

export default function initPhotoWorkSlider() {
  $('.photoWorks')
    .on('init', function(e, slick) {
      $('[aria-label="Previous"]')
        .addClass('prev sliderCtrl')
        .removeClass('slick-prev slick-arrow');
      $('[aria-label="Next"]')
        .addClass('next sliderCtrl')
        .removeClass('slick-next slick-arrow');

      $('[aria-label="Previous"]')
        .text('')
        .append('<div class="slider-controlLine"></div>');
      $('[aria-label="Next"]')
        .text('')
        .append(
          '<div class="slider-controlLine slider-controlLine-right"></div>'
        );
    })
    .on('beforeChange', function(e, slick, currentSlide, nextSlide) {})
    .on('afterChange', function(e, slick, currentSlide, nextSlide) {})
    .slick({
      autoplay: false,
      autoplaySpeed: 8000,
      slideToShow: 1,
      slideToScroll: 1,
      infinite: true,
      speed: 1000,
      pauseOnHover: true,
      useTransform: true,
      lazyLoad: 'progressive',
      arrows: true,
      dots: true
    })
    .slickAnimation();
}
