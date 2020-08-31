// Main scripts for the project
! function () {
  $(document).ready(function () {
    $('.js-mobile-menu-btn').on('click', function () {
      var header_top = $('.header__top');
      if ($('.header__menu').css('display') != 'block') {
        header_top.addClass('override-mobile-open');
      } else {
        header_top.removeClass('override-mobile-open');
      }
      $('.header__menu').slideToggle();
    });
    // var headerElHeight = $('.header__top').outerHeight();
    $(window).on('scroll load', function () {
      ;
      if ($('.header__top').hasClass('override-mobile-open')) {
        return
      }
      $('.header__top').removeClass(function () {
        return $(this).attr('class').split(' ').filter(function (v) {
          return /^override-/.test(v)
        });
      })

      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        $('.header__top').addClass('shorten');

      } else {
        $('.header__top').removeClass('shorten');
      }

      $('section.section, .footer').each(function (i, dom) {
        var el = $(dom);
        
        var headerElHeight = $('.header__top').outerHeight()
        var top = el.offset().top - headerElHeight;
        var bottom = top + el.outerHeight()
        var windowScrollTop = $(window).scrollTop();

        if (windowScrollTop >= top && windowScrollTop <= bottom) {
          var bgColor = el.css('background-color');
          console.log(bgColor)
          if (bgColor == 'rgba(0, 0, 0, 0)' || bgColor == 'rgb(255, 255, 255)') {
            $('.header__top').addClass('override-theme-white');
          } else if (bgColor == 'rgb(0, 0, 0)' || bgColor == 'rgb(23, 21, 21)') {
            $('.header__top').addClass('override-theme-black');
          } else if (bgColor == 'rgb(251, 251, 251)') {
            $('.header__top').addClass('override-theme-gray');
          } else if (bgColor == 'rgb(255, 247, 204)' || bgColor == 'rgb(254, 247, 208)') {
            $('.header__top').addClass('override-theme-lightyellow');
          } else if (bgColor == 'rgb(255, 215, 0)') {
            $('.header__top').addClass('override-theme-yellow');
          }
        }
      })
      return
    });
  });
}();