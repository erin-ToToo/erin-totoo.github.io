$(document).ready(function () {

    let currentIndex = 0;
    const images = $('.carousel img');
    const imageCount = images.length;
    const interval = 4000;
    let imagesLoaded = 0;

    $('img').on('dragstart', function (e) {
        e.preventDefault();
    }).css('user-select', 'none');

    images.each(function () {
        $(this).on('load', function () {
            imagesLoaded++;
            if (imagesLoaded === imageCount) {
                startCarousel();
            }
        });

        if (this.complete) {
            $(this).trigger('load');
        }
    });

    function startCarousel() {
        images.eq(currentIndex).addClass('active');
        setInterval(showNextImage, interval);
    }

    function showNextImage() {
        images.eq(currentIndex).removeClass('active');
        currentIndex = (currentIndex + 1) % imageCount;
        images.eq(currentIndex).addClass('active');
    }

    $('.menu-toggle').on('click', function () {
        $('.menu').toggleClass('active');
    });


    let touchMoved = false;

    $('.submenu a')
        .on('touchstart', function () {
            touchMoved = false;
        })
        .on('touchmove', function () {
            touchMoved = true;
        })
        .on('touchend', function (e) {
            if (!touchMoved) {
                $('.menu').removeClass('active');

                const href = $(this).attr('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            }
        })
        .on('click', function (e) {
            e.preventDefault();
        });


});