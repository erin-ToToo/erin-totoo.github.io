$(document).ready(function () {
    // 首頁Logo動態進場

    gsap.fromTo(
        "#erin-logo",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "back.out" }
    );

    gsap.fromTo(
        "#logo-06",
        { scale: 0, opacity: 0, rotation: -90 },
        { scale: .85, opacity: 1, rotation: 0, duration: 1, ease: "back.out" }
    );

    gsap.fromTo(
        "#logo-07",
        { scale: 0, opacity: 0, rotation: -90 },
        { scale: .85, opacity: 1, rotation: 0, duration: 1, ease: "back.out" }
    );

    gsap.fromTo(
        "#logo-08",
        { scale: 0, opacity: 0, rotation: -90 },
        { scale: .85, opacity: 1, rotation: 0, duration: 1, ease: "back.out" }
    );

    gsap.fromTo(
        "#logo-09",
        { scale: 0, opacity: 0, rotation: -90 },
        { scale: .85, opacity: 1, rotation: 0, duration: 1, ease: "back.out" }
    );

    gsap.fromTo(
        "#cross",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 }
    );

    gsap.fromTo(
        "#title",
        { y: "0" },
        { y: 0, opacity: 1, duration: 1 }
    );


    //點擊「開始瀏覽」
    const start_btn = document.getElementById("start_btn");
    const landing = document.getElementById("landing");
    const sections = document.querySelectorAll("section");
    const fadeItems = document.querySelectorAll(".fade-item");
    start_btn.addEventListener("click", () => {

        landing.style.display = "none";
        sections.forEach(e => e.style.display = "flex");

        gsap.from(sections, {
            duration: 1,
            opacity: 0,
            y: "100vh",
            ease: "power2.out"
        });

        gsap.to(fadeItems, {
            opacity: 1,
            delay: .7,
            y: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power2.out"
        });
    });
});