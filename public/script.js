// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Start page animations
                    initPageAnimations();
                }, 500);
            }, 500);
        }
    }, 200);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorFollower.style.transform = 'scale(1.5)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)';
});

// Hover effect for links and buttons
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Particles Background
function createParticles() {
    const particles = document.querySelector('.particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 2 + 1) + 's';
        particle.style.animationDelay = Math.random() + 's';
        particles.appendChild(particle);
    }
}
createParticles();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Navigation Active State
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
    });
});

// Skill Bars Animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillSection = document.querySelector('.skills');

function animateSkills() {
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Projects Filter and Data
const projects = [
    {
        id: 1,
        title: 'متجر إلكتروني',
        category: 'web',
        image: 'images/project1.jpg',
        description: 'منصة تجارة إلكترونية متكاملة مع نظام إدارة المخزون والمدفوعات',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: '#',
        github: '#'
    },
    {
        id: 2,
        title: 'تطبيق المحادثة',
        category: 'mobile',
        image: 'images/project2.jpg',
        description: 'تطبيق محادثة فوري للهواتف الذكية مع دعم المكالمات الصوتية والفيديو',
        technologies: ['React Native', 'Firebase', 'WebRTC'],
        link: '#',
        github: '#'
    },
    {
        id: 3,
        title: 'لوحة تحكم',
        category: 'web',
        image: 'images/project3.jpg',
        description: 'لوحة تحكم إدارية متكاملة مع رسوم بيانية تفاعلية',
        technologies: ['Vue.js', 'Laravel', 'MySQL', 'D3.js'],
        link: '#',
        github: '#'
    },
    {
        id: 4,
        title: 'تطبيق تتبع اللياقة',
        category: 'mobile',
        image: 'images/project4.jpg',
        description: 'تطبيق لتتبع التمارين والنظام الغذائي مع تحليلات متقدمة',
        technologies: ['Flutter', 'Firebase', 'TensorFlow'],
        link: '#',
        github: '#'
    }
];

function loadProjects(category = 'all') {
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);
    
    // استخدام GSAP للتحريك
    gsap.to('.work-item', {
        opacity: 0,
        y: 20,
        duration: 0.3,
        stagger: 0.1,
        onComplete: () => {
            workGrid.innerHTML = filteredProjects.map(project => `
                <div class="work-item" data-category="${project.category}">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="work-overlay">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="technologies">
                            ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                        </div>
                        <div class="project-links">
                            <a href="${project.github}" target="_blank" class="project-link">
                                <i class="fab fa-github"></i>
                                <span>GitHub</span>
                            </a>
                            <a href="${project.link}" target="_blank" class="project-link">
                                <i class="fas fa-external-link-alt"></i>
                                <span>معاينة</span>
                            </a>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // تحريك العناصر الجديدة
            gsap.from('.work-item', {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1
            });
        }
    });
}

// تحسين فلتر المشاريع
const filterBtns = document.querySelectorAll('.filter-btn');
const workGrid = document.querySelector('.work-grid');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // تحديث حالة الأزرار
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // تحريك الزر النشط
        gsap.from(btn, {
            scale: 1.1,
            duration: 0.3
        });
        
        // تحميل المشاريع المفلترة
        loadProjects(btn.getAttribute('data-filter'));
    });
});

// تحميل المشاريع الأولية
loadProjects();

// Contact Form
const contactForm = document.getElementById('contact-form');
const formMessage = document.querySelector('.form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        btnText.textContent = 'جاري الإرسال...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                formMessage.textContent = 'تم إرسال رسالتك بنجاح!';
                formMessage.style.color = '#2ecc71';
                contactForm.reset();
            } else {
                throw new Error(result.error || 'حدث خطأ في إرسال الرسالة');
            }
        } catch (error) {
            formMessage.textContent = error.message;
            formMessage.style.color = '#e74c3c';
        } finally {
            btnText.textContent = originalText;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        }
    });
}

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Update Copyright Year
document.getElementById('year').textContent = new Date().getFullYear();

// التحكم في مؤشر السحب
const scrollIndicator = document.querySelector('.scroll-indicator');

// إخفاء المؤشر عند التمرير
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercentage > 15) {
        gsap.to(scrollIndicator, {
            opacity: 0,
            yPercent: 50,
            duration: 0.4,
            ease: 'power2.out'
        });
    } else {
        gsap.to(scrollIndicator, {
            opacity: 1,
            yPercent: 0,
            duration: 0.4,
            ease: 'power2.out'
        });
    }
});

// التمرير السلس عند النقر على المؤشر
scrollIndicator.addEventListener('click', () => {
    const aboutSection = document.querySelector('#about');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: aboutSection.offsetTop - headerHeight,
            autoKill: false
        },
        ease: 'power2.inOut'
    });
});

// تأثير التحويم على المؤشر
scrollIndicator.addEventListener('mouseenter', () => {
    gsap.to(scrollIndicator, {
        scale: 1.1,
        duration: 0.3,
        ease: 'back.out(1.5)'
    });
});

scrollIndicator.addEventListener('mouseleave', () => {
    gsap.to(scrollIndicator, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
    });
});

// تحريك المؤشر عند تحريك الماوس
document.addEventListener('mousemove', (e) => {
    if (window.scrollY < 100) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const indicatorRect = scrollIndicator.getBoundingClientRect();
        const centerX = indicatorRect.left + indicatorRect.width / 2;
        const centerY = indicatorRect.top + indicatorRect.height / 2;
        
        const deltaX = (mouseX - centerX) * 0.1;
        const deltaY = (mouseY - centerY) * 0.1;
        
        gsap.to(scrollIndicator, {
            x: `${deltaX}px`,
            y: `${deltaY}px`,
            duration: 0.3,
            ease: 'power2.out'
        });
    }
});

// Page Animations
function initPageAnimations() {
    gsap.from('.hero-text h1', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
    });
    
    gsap.from('.hero-text p', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power4.out'
    });
    
    // Reveal animations for sections
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power4.out'
        });
    });
}

// Intersection Observer for revealing elements
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(element => {
    revealOnScroll.observe(element);
});
