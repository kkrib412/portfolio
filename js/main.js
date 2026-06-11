/* ============================================
   Kenny's Portfolio — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Navbar scroll effect ----
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ---- Mobile nav toggle ----
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // ---- Typing animation ----
    const roles = [
        'AI Applications Developer',
        'Full-Stack AI Engineer',
        'ML Systems Builder',
        'Open Source Enthusiast',
    ];

    const typedEl = document.getElementById('typed-role');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 400; // Pause before next role
        }

        setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 800);

    // ---- Stat counter animation ----
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCount = (el) => {
        const target = parseInt(el.dataset.count);
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statsObserver.observe(el));

    // ---- Scroll fade-in animations ----
    const fadeEls = document.querySelectorAll(
        '.skill-card, .project-card, .contact-card, .about-card, .section-header'
    );

    fadeEls.forEach(el => el.classList.add('fade-in'));

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => fadeObserver.observe(el));

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Year in footer ----
    document.getElementById('year').textContent = new Date().getFullYear();

});
