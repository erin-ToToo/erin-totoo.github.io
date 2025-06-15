$(document).ready(function () {

    let currentIndex = 0;
    const images = $('.carousel img');
    const imageCount = images.length;
    const interval = 4000;
    let imagesLoaded = 0;
    let radarChart;

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


    function createRadarChart() {
        new Chart(document.getElementById('skill-chart'), {
            type: 'radar',
            data: {
                labels: [
                    'Adobe Illustrator CC',
                    'Word / Excel / PowerPoint',
                    'Adobe InDesign CC',
                    'Canva',
                    'Adobe Photoshop CC',
                    'Capcut',
                ],
                datasets: [{
                    label: '熟練度 (%)',
                    data: [100, 60, 90, 70, 80, 90],
                    fill: true,
                    backgroundColor: 'rgba(245, 0, 0, 0.7)',
                }]
            },
            options: {
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    r: {
                        angleLines: { display: false },
                        grid: { display: false },
                        pointLabels: { display: false },
                        ticks: { display: false },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                }
            }
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !radarChart) {
                createRadarChart();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(document.getElementById('skill-chart'));
});

