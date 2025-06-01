/**
 * ملف JavaScript لموقع Portfolio
 * يحتوي على جميع التأثيرات والوظائف المطلوبة
 * مع تطبيق نظام الألوان الجديد
 */

// انتظار تحميل DOM بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // ============ تأثير الضغط بالماوس ============
    document.addEventListener('mousedown', function(e) {
        // تحديد موقع الضغط
        document.documentElement.style.setProperty('--x', e.clientX + 'px');
        document.documentElement.style.setProperty('--y', e.clientY + 'px');
        
        // إنشاء تأثير التموج
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        ripple.style.backgroundColor = '#64FFDA'; // لون التميز
        document.body.appendChild(ripple);
        
        // إزالة التأثير بعد ثانية
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });

    // ============ تأثير الأيقونات الاجتماعية ============
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        // تأثير عند التمرير
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            this.style.boxShadow = '0 5px 15px rgba(100, 255, 218, 0.4)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // تأثير الجسيمات عند النقر
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            createParticles(e.clientX, e.clientY, '#64FFDA');
            
            // فتح الرابط بعد تأثير الجسيمات
            setTimeout(() => {
                window.open(this.href, '_blank');
            }, 500);
        });
    });

    // ============ تأثير المهارات ============
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 15px rgba(100, 255, 218, 0.7)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // ============ بطاقات المشاريع ============
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // تأثير الدوران عند التمرير
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(0deg)';
        });
        
        // فتح رابط المشروع عند النقر
        card.addEventListener('click', function() {
            if (this.dataset.link) {
                window.open(this.dataset.link, '_blank');
            }
        });
    });

    // ============ روابط التواصل ============
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            let link;
            const icon = this.querySelector('i');
            
            // تحديد الرابط حسب الأيقونة
            if (icon.classList.contains('fa-whatsapp')) {
                link = 'https://wa.me/9647813593443';
            } else if (icon.classList.contains('fa-envelope')) {
                link = 'mailto:wktb185@gmail.com';
            } else if (icon.classList.contains('fa-instagram')) {
                link = 'https://www.instagram.com/codebyhasnain/';
            } else if (icon.classList.contains('fa-linkedin-in')) {
                link = 'https://www.linkedin.com/in/حسنين-جاسم-9b1008361';
            } else if (icon.classList.contains('fa-github')) {
                link = 'https://github.com/9ttedy';
            }
            
            if (link) {
                // تأثير قبل فتح الرابط
                this.style.backgroundColor = 'rgba(100, 255, 218, 0.2)';
                setTimeout(() => {
                    window.open(link, '_blank');
                    this.style.backgroundColor = '';
                }, 300);
            }
        });
    });

    // ============ تأثير الصورة الشخصية ============
    const profileImg = document.querySelector('.profile-image img');
    if (profileImg) {
        profileImg.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            this.style.boxShadow = '0 0 30px rgba(100, 255, 218, 0.6)';
        });
        
        profileImg.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            this.style.boxShadow = '0 0 20px rgba(100, 255, 218, 0.3)';
        });
    }

    // ============ تهيئة الجسيمات الخلفية ============
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: "#64FFDA" }, // لون التميز
                shape: { type: "circle" },
                opacity: { value: 0.7 },
                size: { value: 3 },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#64FFDA", // لون التميز
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // ============ تحديث سنة الفوتر ============
    document.getElementById('year').textContent = new Date().getFullYear();
});

/**
 * وظيفة إنشاء جسيمات عند النقر
 * @param {number} x - موقع الأفقي للنقر
 * @param {number} y - موقع الرأسي للنقر
 * @param {string} color - لون الجسيمات (اختياري)
 */
function createParticles(x, y, color = "#64FFDA") {
    const particles = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = color;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);
        
        particles.push({
            element: particle,
            x: x,
            y: y,
            vx: Math.random() * 6 - 3,
            vy: Math.random() * 6 - 3,
            life: 1000 + Math.random() * 500
        });
    }
    
    // تحريك الجسيمات
    const animateParticles = () => {
        const now = Date.now();
        const toRemove = [];
        
        particles.forEach((p, index) => {
            const age = now - p.birth;
            if (age >= p.lifetime) {
                p.element.remove();
                toRemove.push(index);
                return;
            }
            
            const progress = age / p.lifetime;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // تأثير الجاذبية
            
            p.element.style.left = p.x + 'px';
            p.element.style.top = p.y + 'px';
            p.element.style.opacity = 1 - progress;
            p.element.style.transform = `scale(${1 - progress * 0.5})`;
        });
        
        // إزالة الجسيمات المنتهية
        toRemove.reverse().forEach(index => {
            particles.splice(index, 1);
        });
        
        if (particles.length > 0) {
            requestAnimationFrame(animateParticles);
        }
    };
    
    animateParticles();
}

/**
 * تأثير رنين عند النقر على العناصر
 * @param {HTMLElement} element - العنصر المستهدف
 * @param {number} x - الموقع الأفقي للنقر
 * @param {number} y - الموقع الرأسي للنقر
 */
function createRipple(element, x, y) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.backgroundColor = 'rgba(100, 255, 218, 0.7)'; // لون التميز
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
}
