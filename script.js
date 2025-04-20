// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 100);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            document.querySelectorAll('nav ul li a').forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to clicked link
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add cursor trailer effect (gamer-style cursor)
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-trailer');
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        const deltaX = mouseX - cursorX;
        const deltaY = mouseY - cursorY;
        
        cursorX += deltaX * 0.15;
        cursorY += deltaY * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(updateCursor);
    }

    updateCursor();

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .social-links a');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // Form Submission with enhanced validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Add input animation
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

        formInputs.forEach(input => {
            // Add focus effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });

            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('input-focused');
                }
            });

            // Check if the input has value on load
            if (input.value !== '') {
                input.parentElement.classList.add('input-focused');
            }
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Form Validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !subject || !message) {
                showFormError('Please fill in all fields');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormError('Please enter a valid email address');
                return;
            }

            // Show success message
            showFormSuccess('Thank you for your message! I will get back to you soon.');
            contactForm.reset();

            // Remove focus classes
            formInputs.forEach(input => {
                input.parentElement.classList.remove('input-focused');
            });
        });
    }

    // Helper functions for form feedback
    function showFormError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;

        // Remove any existing error messages
        const existingError = document.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        contactForm.prepend(errorDiv);

        // Auto remove after 3 seconds
        setTimeout(() => {
            errorDiv.classList.add('fade-out');
            setTimeout(() => {
                errorDiv.remove();
            }, 300);
        }, 3000);
    }

    function showFormSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.textContent = message;

        // Remove any existing messages
        const existingSuccess = document.querySelector('.form-success');
        if (existingSuccess) {
            existingSuccess.remove();
        }

        contactForm.prepend(successDiv);

        // Auto remove after 4 seconds
        setTimeout(() => {
            successDiv.classList.add('fade-out');
            setTimeout(() => {
                successDiv.remove();
            }, 300);
        }, 4000);
    }

    // Animate Skills Bars on Scroll
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-level');

    // Animation function with staggered effect
    function animateSkills() {
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos) {
            skillBars.forEach((bar, index) => {
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                    bar.style.transition = 'width 1s ease-in-out';
                }, 200 * index); // Staggered delay for each bar
            });

            // Remove event listener after animation
            window.removeEventListener('scroll', animateSkills);
        }
    }

    // Add scroll event listener
    if (skillsSection && skillBars.length > 0) {
        window.addEventListener('scroll', animateSkills);
        // Check on initial load
        animateSkills();
    }

    // Enhanced Project Card Hover Effect
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
            // Create a glowing effect
            const glowEffect = document.createElement('div');
            glowEffect.classList.add('card-glow');
            this.appendChild(glowEffect);
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
            // Remove glow effect
            const glowEffect = this.querySelector('.card-glow');
            if (glowEffect) {
                glowEffect.remove();
            }
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.createElement('div');
    menuBtn.classList.add('menu-btn');
    menuBtn.innerHTML = '<span></span><span></span><span></span>';
    document.querySelector('header').appendChild(menuBtn);

    const navMenu = document.querySelector('nav ul');

    menuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });

    // Add active class to current menu item based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Text typing effect for hero section
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Only run on desktop to avoid performance issues on mobile
        if (window.innerWidth > 768) {
            setTimeout(typeWriter, 500);
        } else {
            heroTitle.innerHTML = text;
        }
    }

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            // Move at different speeds
            document.querySelector('.hero-content').style.transform = `translateY(${scrollPosition * 0.2}px)`;
            document.querySelector('.hero-image').style.transform = `translateY(${scrollPosition * -0.1}px)`;
        });
    }

    // Add tilt effect to project cards
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;

            card.style.transform = `perspective(1000px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Add scrolling progress indicator
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.about-content, .projects-grid, .skills-container, .contact-container');

    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    // Check on initial load
    revealOnScroll();
});
