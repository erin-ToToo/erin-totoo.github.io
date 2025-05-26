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


    function bindTouchEvents() {
        let touchMoved = false;

        $('.submenu a')
            .off('.responsive') // 先移除舊的事件，避免重複綁定
            .on('touchstart.responsive', function () {
                touchMoved = false;
            })
            .on('touchmove.responsive', function () {
                touchMoved = true;
            })
            .on('touchend.responsive', function () {
                if (!touchMoved) {
                    $('.menu').removeClass('active');

                    const href = $(this).attr('href');
                    if (href && href !== '#') {
                        window.location.href = href;
                    }
                }
            })
            .on('click.responsive', function (e) {
                e.preventDefault();
            });
    }

    function unbindTouchEvents() {
        $('.submenu a').off('.responsive'); // 移除標記為 .responsive 的所有事件
    }

    function handleResponsiveBinding() {
        if (window.innerWidth < 1400) {
            bindTouchEvents();
        } else {
            unbindTouchEvents();
        }
    }

    // 初始綁定
    handleResponsiveBinding();

    // 當視窗大小變化時重新判斷
    $(window).on('resize', function () {
        handleResponsiveBinding();
    });

});