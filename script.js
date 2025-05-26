document.addEventListener('DOMContentLoaded', function() {
    // تأثير الضغط بالماوس
    document.addEventListener('mousedown', function(e) {
        document.documentElement.style.setProperty('--x', e.clientX + 'px');
        document.documentElement.style.setProperty('--y', e.clientY + 'px');
    });
    
   // تأثير الأيقونات الاجتماعية
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    const color = icon.getAttribute('data-color');
    icon.style.setProperty('--color', color);
    
    // تأثير الجسيمات عند النقر
    icon.addEventListener('click', function(e) {
        // السماح بفتح الرابط
        const parentLink = icon.closest('a');
        if (parentLink && parentLink.href) {
            createParticles(e.clientX, e.clientY, color);
            // لا نمنع السلوك الافتراضي
        }
    });
});
    
    // تأثير المهارات
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            const icon = this.getAttribute('data-icon');
            // يمكن إضافة تأثيرات إضافية هنا
        });
    });
    
    // تأثير بطاقات المشاريع - نسخة معدلة
document.querySelectorAll('.project-card').forEach((card, index) => {
    // روابط المشاريع (يمكن استبدالها بالرواقع الحقيقية)
    const projectLinks = [
        'https://9ttedy.github.io/calculator-amazing-effects/',
        'https://9ttedy.github.io/Hassanein-portolio/',
        'https://9ttedy.github.io/CUEB-BACKROUND/',
        'https://9ttedy.github.io/dr.purplewealth-card/',
        'https://example.com/project5',
        'https://example.com/project6'
    ];
    
    // إضافة رابط لكل بطاقة
    card.setAttribute('data-link', projectLinks[index]);
    
    // تأثير الدوران عند التمرير
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'rotateY(180deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'rotateY(0deg)';
    });
    
    // فتح الرابط عند النقر
    card.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(this.getAttribute('data-link'), '_blank');
    });
    
    // تحسين الأداء
    card.style.willChange = 'transform';
});
    
    // تهيئة تأثير الجسيمات
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#4a6fa5" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#4a6fa5", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            }
        });
    }
    
    // تحديث سنة الفوتر
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // التمرير السلس عند النقر على روابط الهيدر
    document.querySelectorAll('header a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// وظيفة إنشاء جسيمات
function createParticles(x, y, color) {
    const particles = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = color;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        const lifetime = 1000 + Math.random() * 500;
        
        particles.push({
            element: particle,
            x: x,
            y: y,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            birth: Date.now(),
            lifetime: lifetime
        });
    }
    
    function animateParticles() {
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
            p.vy += 0.05; // الجاذبية
            
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
    }
    
    animateParticles();
}

// تأثير الصورة الشخصية
const profileImage = document.querySelector('.profile-image img');
if (profileImage) {
    profileImage.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    profileImage.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // تأثير الصورة الشخصية (نسخة محسنة)
const profileImage = document.querySelector('.profile-image img');
if (profileImage) {
    // تأكد من تحميل الصورة أولاً
    profileImage.onload = function() {
        this.style.opacity = 1;
    };
    
    // إعداد أولي للصورة
    profileImage.style.opacity = 0;
    profileImage.style.willChange = 'transform';
    
    profileImage.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    profileImage.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}
}