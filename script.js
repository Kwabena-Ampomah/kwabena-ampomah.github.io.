document.addEventListener('DOMContentLoaded', (event) => {
    const text = document.querySelector(".title h1");
    const strText = text.textContent;
    const splitText = strText.split("");
    text.textContent = "";

    for (let i = 0; i < splitText.length; i++) {
        if (splitText[i] !== ' ') {
            text.innerHTML += "<span>" + splitText[i] + "</span>";
        } else {
            text.innerHTML += ' ';
        }
    }

    let char = 0;
    let timer = setInterval(onTick, 100);

    function onTick() {
        const spans = text.querySelectorAll('span');
        if (char < spans.length) {
            const span = spans[char];
            span.classList.add('fade');
            char++;
        } else {
            complete();
        }
    }

    function complete() {
        clearInterval(timer);
        timer = null;
    }
});

// GSAP animations and scroll effects combined
document.addEventListener('DOMContentLoaded', function() {
    const timeline = gsap.timeline({ defaults: { duration: 1 }});
    timeline
        .from('.header', { y: '-100%', ease: 'bounce' })
        .from('.link', { opacity: 0, stagger: .5 })
        .from('.right', { x: '-100vw', ease: 'power2.in' }, 1)
        .from('.left', { x: '-100%' }, '<.5')
        .to('.footer', { y: 0, ease: 'elastic' })
        .fromTo('.button', { opacity: 0, scale: 0, rotation: 720 }, { opacity: 1, scale: 1, rotation: 0 });

    const button = document.querySelector('.button');
    button.addEventListener('click', () => {
        timeline.timeScale(3).reverse();
    });

    // Scroll reveal and parallax effects in one scroll event
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;

        // Reveal elements on scroll
        const revealElements = document.querySelectorAll('.fade');
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < viewportHeight - 50) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        // Parallax background effect
        const parallaxBackground = document.querySelector('.parallax-background');
        if (parallaxBackground) {
            const parallaxSpeed = 0.5;
            parallaxBackground.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
        }

        // Parallax image effect
        const parallaxContainer = document.querySelector('.about');
        const parallaxImage = document.querySelector('.parallax-image');
        if (parallaxContainer && parallaxImage) {
            const sectionTop = parallaxContainer.offsetTop;
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + parallaxContainer.offsetHeight) {
                const parallaxSpeed = 0.3;
                const imageOffset = (scrollPosition - sectionTop) * parallaxSpeed;
                parallaxImage.style.transform = `translateY(${imageOffset}px)`;
            }
        }
    });
});
