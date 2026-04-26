document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // ─── CUSTOM CURSOR + TEXT TRAIL ───
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-trailer');
    document.body.appendChild(cursor);

    const cursorWords = ['PLAY', 'CREATE', 'BUILD', 'CODE', 'DESIGN', 'SHIP', 'UNITY', 'GAME', 'DEV', 'FUN'];
    let wordIndex = 0;
    let lastTextTime = 0;
    let mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        const now = Date.now();
        if (now - lastTextTime > 300) {
            lastTextTime = now;
            spawnCursorText(e.clientX, e.clientY);
        }
    });

    function spawnCursorText(x, y) {
        const el = document.createElement('div');
        el.classList.add('cursor-text');
        el.textContent = cursorWords[wordIndex % cursorWords.length];
        wordIndex++;
        el.style.left = (x + 20) + 'px';
        el.style.top = (y - 10) + 'px';
        document.body.appendChild(el);
        requestAnimationFrame(() => el.classList.add('active'));
        gsap.to(el, {
            y: -40, opacity: 0, duration: 1.2, ease: 'power2.out',
            onComplete: () => el.remove()
        });
    }

    (function loop() {
        cx += (mx - cx) * 0.12;
        cy += (my - cy) * 0.12;
        cursor.style.left = cx + 'px';
        cursor.style.top = cy + 'px';
        requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, .project-card, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    // ─── FLOATING PARTICLES ON SCROLL ───
    const particleColors = ['#8B5CF6', '#EC4899', '#A78BFA', '#F472B6'];
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden';
    document.body.appendChild(particleContainer);
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 6 + 2;
        p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;
            background:${particleColors[Math.floor(Math.random() * particleColors.length)]};
            left:${Math.random() * 100}%;top:${Math.random() * 100}%;opacity:0`;
        particleContainer.appendChild(p);
        gsap.to(p, { opacity: Math.random() * 0.4 + 0.1, y: -window.innerHeight * 1.5,
            x: (Math.random() - 0.5) * 200, duration: Math.random() * 20 + 15,
            repeat: -1, delay: Math.random() * 10, ease: 'none' });
    }

    // ─── CLICK EXPLOSION PARTICLES ───
    document.addEventListener('click', e => {
        for (let i = 0; i < 12; i++) {
            const spark = document.createElement('div');
            const size = Math.random() * 8 + 4;
            const color = particleColors[Math.floor(Math.random() * particleColors.length)];
            const angle = (Math.PI * 2 / 12) * i + Math.random() * 0.5;
            const dist = Math.random() * 100 + 50;
            spark.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:50%;
                background:${color};left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;z-index:9997;
                box-shadow:0 0 ${size*2}px ${color}`;
            document.body.appendChild(spark);
            gsap.to(spark, {
                x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
                opacity: 0, scale: 0, duration: 0.8 + Math.random() * 0.4,
                ease: 'power2.out', onComplete: () => spark.remove()
            });
        }
        // Ring effect
        const ring = document.createElement('div');
        ring.style.cssText = `position:fixed;width:10px;height:10px;border-radius:50%;border:2px solid #8B5CF6;
            left:${e.clientX}px;top:${e.clientY}px;pointer-events:none;z-index:9997;transform:translate(-50%,-50%)`;
        document.body.appendChild(ring);
        gsap.to(ring, { width: 80, height: 80, opacity: 0, borderWidth: 0, duration: 0.6, ease: 'power2.out',
            onComplete: () => ring.remove() });
    });

    // ─── SPARKLE CURSOR TRAIL ───
    let sparkleTimer = 0;
    document.addEventListener('mousemove', e => {
        sparkleTimer++;
        if (sparkleTimer % 3 !== 0) return;
        const sparkle = document.createElement('div');
        const size = Math.random() * 5 + 2;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        sparkle.style.cssText = `position:fixed;width:${size}px;height:${size}px;border-radius:50%;
            background:${color};left:${e.clientX + (Math.random()-0.5)*20}px;
            top:${e.clientY + (Math.random()-0.5)*20}px;pointer-events:none;z-index:9996;
            box-shadow:0 0 ${size*3}px ${color}`;
        document.body.appendChild(sparkle);
        gsap.to(sparkle, { y: Math.random() * 40 + 20, opacity: 0, scale: 0,
            duration: 0.6 + Math.random() * 0.4, ease: 'power1.out', onComplete: () => sparkle.remove() });
    });




    // ─── GSAP HERO ANIMATION ───
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
        .from('.hero-label', { y: 30, opacity: 0, duration: 0.8, delay: 0.3 })
        .from('.hero-text h1', { y: 60, opacity: 0, duration: 1, clipPath: 'inset(100% 0 0 0)' }, '-=0.4')
        .from('.hero-text p', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
        .from('.hero-buttons', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-image', { x: 80, opacity: 0, scale: 0.9, duration: 1.2, ease: 'elastic.out(1,0.8)' }, '-=1');

    // ─── BG SHAPES PARALLAX ───
    document.querySelectorAll('.bg-shape').forEach((shape, i) => {
        gsap.to(shape, {
            y: (i + 1) * -100,
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
        });
    });

    // ─── MARQUEE SPEED BOOST ON SCROLL ───
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        ScrollTrigger.create({
            trigger: '.marquee-section',
            start: 'top bottom',
            end: 'bottom top',
            onUpdate: (self) => {
                const speed = 20 - self.progress * 12;
                marqueeTrack.style.animationDuration = speed + 's';
            }
        });
    }

    // ─── STAT ITEMS REVEAL ───
    gsap.utils.toArray('.stat-item').forEach((item, i) => {
        gsap.to(item, {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%', once: true },
            delay: i * 0.15
        });
    });

    // ─── STAT COUNTER ANIMATION ───
    document.querySelectorAll('.stat-number').forEach(el => {
        const text = el.textContent;
        const num = parseInt(text);
        if (!isNaN(num)) {
            const suffix = text.replace(num, '');
            el.textContent = '0' + suffix;
            ScrollTrigger.create({
                trigger: el, start: 'top 85%', once: true,
                onEnter: () => {
                    gsap.to({ val: 0 }, {
                        val: num, duration: 2, ease: 'power2.out',
                        onUpdate: function() { el.textContent = Math.round(this.targets()[0].val) + suffix; }
                    });
                }
            });
        }
    });

    // ─── SECTION HEADINGS REVEAL ───
    document.querySelectorAll('.section-label, .section-title, .section-subtitle').forEach((el, i) => {
        gsap.to(el, {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            delay: i * 0.1
        });
    });

    // ─── ABOUT SECTION REVEAL ───
    gsap.utils.toArray('.about .reveal').forEach((el) => {
        gsap.to(el, {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
    });

    // ─── PROJECT CARDS STAGGER ───
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.to(card, {
            y: 0, opacity: 1, rotate: i % 2 === 0 ? 1 : -1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
            delay: (i % 3) * 0.15
        });
        // 3D tilt on hover
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, { rotateX: -y * 10, rotateY: x * 10, scale: 1.03, duration: 0.3, ease: 'power2.out',
                transformPerspective: 800, transformOrigin: 'center' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, rotate: i % 2 === 0 ? 1 : -1, duration: 0.5, ease: 'elastic.out(1,0.5)' });
        });
    });

    // ─── EXPERIENCE ITEMS SLIDE IN ───
    gsap.utils.toArray('.experience-item').forEach((item, i) => {
        gsap.to(item, {
            x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%', once: true },
            delay: i * 0.2
        });
    });

    // ─── EDUCATION CARDS POP IN ───
    gsap.utils.toArray('.education-item').forEach((item, i) => {
        gsap.to(item, {
            y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%', once: true },
            delay: i * 0.12
        });
    });

    // ─── SKILL BARS ANIMATE ───
    gsap.utils.toArray('.skill').forEach((skill, i) => {
        const bar = skill.querySelector('.skill-level');
        const pct = getComputedStyle(bar).getPropertyValue('--skill-percentage');
        bar.style.width = '0%';
        ScrollTrigger.create({
            trigger: skill, start: 'top 88%', once: true,
            onEnter: () => {
                gsap.to(skill, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.08 });
                gsap.to(bar, { width: pct, duration: 1.4, delay: i * 0.08 + 0.3, ease: 'power3.out' });
            }
        });
    });

    // ─── SERVICE CARDS STAGGER ───
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.to(card, {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
            delay: i * 0.1
        });
        // Magnetic hover
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
            gsap.to(card, { x, y, duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
        });
    });

    // ─── CONTACT SECTION ───
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    if (contactInfo) {
        contactInfo.style.opacity = '0'; contactInfo.style.transform = 'translateX(-40px)';
        gsap.to(contactInfo, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-container', start: 'top 80%', once: true } });
    }
    if (contactForm) {
        contactForm.style.opacity = '0'; contactForm.style.transform = 'translateX(40px)';
        gsap.to(contactForm, { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: '.contact-container', start: 'top 80%', once: true } });
    }

    // ─── FOOTER WATERMARK PARALLAX ───
    gsap.to('.footer-watermark', {
        x: -100,
        scrollTrigger: { trigger: 'footer', start: 'top bottom', end: 'bottom bottom', scrub: 1 }
    });

    // ─── MAGNETIC BUTTONS ───
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
            gsap.to(btn, { x, y, duration: 0.2 });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1,0.4)' });
        });
    });

    // ─── STICKY HEADER ───
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => header.classList.toggle('sticky', window.scrollY > 80));

    // ─── SMOOTH SCROLL ───
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('nav ul li a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            const t = document.querySelector(this.getAttribute('href'));
            if (t) window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' });
            document.querySelector('nav ul').classList.remove('active');
            const mb = document.querySelector('.menu-btn');
            if (mb) mb.classList.remove('active');
        });
    });

    // ─── MOBILE MENU ───
    const menuBtn = document.createElement('div');
    menuBtn.classList.add('menu-btn');
    menuBtn.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(menuBtn);
    menuBtn.addEventListener('click', () => {
        document.querySelector('nav ul').classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // ─── SCROLL PROGRESS ───
    const bar = document.createElement('div');
    bar.classList.add('scroll-progress');
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
        bar.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
    });

    // ─── ACTIVE NAV LINK ───
    window.addEventListener('scroll', () => {
        let cur = '';
        document.querySelectorAll('section').forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) cur = s.id;
        });
        document.querySelectorAll('nav ul li a').forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href') === '#' + cur) l.classList.add('active');
        });
    });

    // ─── FORM ───
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const n = document.getElementById('name').value;
            const em = document.getElementById('email').value;
            const s = document.getElementById('subject').value;
            const m = document.getElementById('message').value;
            if (!n || !em || !s || !m) { showMsg('Please fill in all fields', 'error'); return; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { showMsg('Enter a valid email', 'error'); return; }
            showMsg('Thank you! I will get back to you soon.', 'success');
            form.reset();
        });
    }
    function showMsg(text, type) {
        const old = document.querySelector('.form-msg');
        if (old) old.remove();
        const d = document.createElement('div');
        d.className = 'form-msg';
        d.style.cssText = `padding:14px 18px;border-radius:12px;margin-bottom:16px;font-size:.95rem;
            background:${type === 'error' ? 'rgba(139,92,246,.1)' : 'rgba(34,197,94,.1)'};
            border:1px solid ${type === 'error' ? 'rgba(139,92,246,.3)' : 'rgba(34,197,94,.3)'};
            color:${type === 'error' ? '#8B5CF6' : '#22c55e'}`;
        d.textContent = text;
        form.prepend(d);
        gsap.from(d, { y: -10, opacity: 0, duration: 0.3 });
        setTimeout(() => { gsap.to(d, { opacity: 0, y: -10, duration: 0.3, onComplete: () => d.remove() }); }, 4000);
    }
});
