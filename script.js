// script.js

const INSTAGRAM_USERNAME = "kriss_kruzz";

document.addEventListener("DOMContentLoaded", () => {
    const instagramUrl = `https://instagram.com/${INSTAGRAM_USERNAME}`;

    document.querySelectorAll('.ig-link').forEach(link => {
        link.href = instagramUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });

    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    const policyModal = document.getElementById('policy-modal');
    const policyTitle = document.getElementById('policy-title');
    const policyContent = document.getElementById('policy-content');
    const policies = {
        terms: {
            title: 'Terms of Service',
            content: '<p>By using IG BOOST, you agree to provide accurate order details and use our services lawfully. Service availability, delivery times, and results may vary by package and platform conditions.</p><p>We may update these terms when our services change. Please review this notice before placing a new order.</p>'
        },
        privacy: {
            title: 'Privacy Policy',
            content: '<p>IG BOOST only uses information you share when contacting us to respond to your request and arrange your order. We do not sell personal information.</p><p>For privacy questions, contact us through the Instagram profile linked on this website.</p>'
        },
        cookies: {
            title: 'Cookie Policy',
            content: '<p>This website does not use advertising or tracking cookies. It may use your browser storage or standard technical features only when needed for the page to function.</p>'
        },
        refunds: {
            title: 'Refund Policy',
            content: '<p>Because packages are handled individually, refund requests are reviewed case by case. Contact us through Instagram as soon as an issue occurs and include your order details.</p><p>Completed or partially delivered services may not be eligible for a full refund.</p>'
        }
    };

    function closePolicy() {
        if (!policyModal) return;
        policyModal.hidden = true;
        document.body.style.overflow = '';
    }

    if (policyModal && policyTitle && policyContent) {
        document.querySelectorAll('[data-policy]').forEach(button => {
            button.addEventListener('click', () => {
                const policy = policies[button.dataset.policy];
                if (!policy) return;
                policyTitle.textContent = policy.title;
                policyContent.innerHTML = policy.content;
                policyModal.hidden = false;
                document.body.style.overflow = 'hidden';
            });
        });

        policyModal.querySelectorAll('[data-policy-close]').forEach(control => {
            control.addEventListener('click', closePolicy);
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') closePolicy();
        });
    }

    // 2. 3D Service Card Tilt Effect
    const cards = document.querySelectorAll('.tilt-card');
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 12;
                const rotateY = (centerX - x) / 12;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // 3. FAQ Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            
            // Toggle active state
            const isActive = item.classList.contains('active');

            // Close all
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 4. Scroll Reveal Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 5. Interactive Hero Parallax Effect
    const heroStage = document.getElementById('hero-3d-stage');
    if (heroStage && !isMobile) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
            heroStage.style.transform = `rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
        });
    }

    // 6. Background Canvas Particles
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.alpha = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.fillStyle = `rgba(157, 0, 255, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation Loop using requestAnimationFrame
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }
});