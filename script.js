document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const contactForm = document.getElementById('contact-form');

    // --- Theme Toggle ---

    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        if (currentTheme === 'light') {
            body.classList.remove('dark-theme');
            updateThemeIcon(false);
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        let isDark = body.classList.contains('dark-theme');

        // Save to local storage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        updateThemeIcon(isDark);
    });

    function updateThemeIcon(isDark) {
        const icon = themeToggleBtn.querySelector('i');
        if (isDark) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // --- Mobile Menu Toggle ---

    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.querySelector('i').className = 'fas fa-bars';
        });
    });

    // --- Scroll Effects ---

    window.addEventListener('scroll', () => {
        // Navbar glassmorphism effect on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active nav link on scroll
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Stats Counter Animation ---

    const statsSection = document.querySelector('.about-stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const suffix = target > 0 ? '+' : '';
            const duration = 2000; // 2 seconds
            const increment = target > 0 ? target / (duration / 16) : 0; // 60fps

            let current = 0;
            const updateCounter = () => {
                if (target === 0) {
                    stat.innerText = '0' + suffix;
                    return;
                }

                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target + suffix;
                }
            };
            updateCounter();
        });
    };

    // Intersection Observer for stats animation
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                animateStats();
                hasAnimated = true;
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // --- Form Submission Simulation ---

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = btn.innerHTML;
            const formMessage = document.getElementById('form-message');

            // UI Loading state
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;

                formMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                formMessage.className = 'form-message success';

                contactForm.reset();

                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // Add initial animation classes
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
