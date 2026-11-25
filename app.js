document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.getElementById('mainNav');
    const hamburgerBtn = document.getElementById('hamburgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    const menuCloseBtn = document.getElementById('menuClose');
    const menuLinks = document.querySelectorAll('.menu-link');
    const navLinks = document.querySelectorAll('.nav-links a');

    function setMenuState(isOpen) {
        hamburgerBtn.classList.toggle('active', isOpen);
        mobileMenu.classList.toggle('open', isOpen);
        mobileBackdrop.classList.toggle('open', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    // Toggle menu via hamburger
    hamburgerBtn?.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('open');
        setMenuState(isOpen);
    });

    // Close menu via X button, backdrop, or Escape key
    menuCloseBtn?.addEventListener('click', () => setMenuState(false));
    mobileBackdrop?.addEventListener('click', () => setMenuState(false));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            setMenuState(false);
        }
    });

    // Close mobile menu when any link or mobile CTA is clicked
    menuLinks.forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });

    document.querySelector('.mobile-cta')?.addEventListener('click', () => {
        setMenuState(false);
    });

    // Subtle compact glass transition on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 24) {
            mainNav?.classList.add('scrolled');
        } else {
            mainNav?.classList.remove('scrolled');
        }
    }, { passive: true });

    // Highlight active section link on click
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});


// hero section scroll
const slides = document.querySelectorAll('#hero .slide');
const thumbs = document.querySelectorAll('#hero .thumb');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

let current = 0;
let timer;

function showSlide(index) {
    slides[current].classList.remove('active');
    thumbs[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    thumbs[current].classList.add('active');
}

function resetAutoSlide() {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 5000);
}

prevBtn?.addEventListener('click', () => {
    showSlide(current - 1);
    resetAutoSlide();
});

nextBtn?.addEventListener('click', () => {
    showSlide(current + 1);
    resetAutoSlide();
});

thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
        showSlide(Number(thumb.dataset.index));
        resetAutoSlide();
    });
});

resetAutoSlide();