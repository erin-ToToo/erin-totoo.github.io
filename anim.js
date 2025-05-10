$(document).ready(function () {
    gsap.to(
        "#erin-logo",
        {
            keyframes: [
                { opacity: 1, duration: .5, ease: "circ.in" }
            ]
        }
    );

    // gsap.to(
    //     ".carousel_cover",
    //     {
    //         keyframes: [
    //             { opacity: 1, duration: 2.5, },
    //             { opacity: .65, duration: 1, ease: "circ.out" }
    //         ]
    //     }
    // );

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

    // gsap.delayedCall(4, () => {
    //     document.getElementById("section1").style.display = "flex";
    //     document.getElementById("section1").style.height = "100dvh";
    // });
});