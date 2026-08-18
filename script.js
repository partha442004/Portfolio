// ============================================
// THEME SWITCHING
// ============================================
const themeSwitcher = document.getElementById('theme-switcher');
const btnMinecraft = document.getElementById('btn-minecraft');
const btnGta = document.getElementById('btn-gta');
const minecraftTheme = document.getElementById('minecraft-theme');
const gtaTheme = document.getElementById('gta-theme');

function switchTheme(theme) {
    btnMinecraft.classList.toggle('active', theme === 'minecraft');
    btnGta.classList.toggle('active', theme === 'gta');
    minecraftTheme.classList.toggle('active', theme === 'minecraft');
    gtaTheme.classList.toggle('active', theme === 'gta');
    localStorage.setItem('portfolio-theme', theme);
}

btnMinecraft.addEventListener('click', () => switchTheme('minecraft'));
btnGta.addEventListener('click', () => switchTheme('gta'));

const savedTheme = localStorage.getItem('portfolio-theme') || 'minecraft';
switchTheme(savedTheme);

// ============================================
// MINECRAFT HOTBAR NAVIGATION
// ============================================
const hotbarSlots = document.querySelectorAll('.hotbar-slot');
const mcSections = document.querySelectorAll('.mc-section');

function switchMcSection(sectionId) {
    hotbarSlots.forEach(slot => {
        slot.classList.toggle('active', slot.dataset.section === sectionId);
    });
    mcSections.forEach(section => {
        section.classList.toggle('active', section.id === `mc-${sectionId}`);
    });
}

hotbarSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        switchMcSection(slot.dataset.section);
    });
});

document.addEventListener('keydown', (e) => {
    if (!minecraftTheme.classList.contains('active')) return;
    const key = parseInt(e.key);
    if (key >= 1 && key <= 5) {
        const sections = ['home', 'skills', 'projects', 'about', 'contact'];
        switchMcSection(sections[key - 1]);
    }
});

// ============================================
// MINECRAFT CHEST ANIMATION
// ============================================
const mcChest = document.getElementById('mc-chest');
const chestLid = mcChest.querySelector('.chest-lid');
const chestBody = mcChest.querySelector('.chest-body');
let chestOpen = false;

mcChest.addEventListener('click', (e) => {
    if (e.target.closest('.chest-slot')) return;
    chestOpen = !chestOpen;
    chestLid.classList.toggle('open', chestOpen);
    chestBody.classList.toggle('open', chestOpen);
});

const projectsSlot = document.querySelector('[data-section="projects"]');
projectsSlot.addEventListener('click', () => {
    setTimeout(() => {
        if (!chestOpen) {
            chestOpen = true;
            chestLid.classList.add('open');
            chestBody.classList.add('open');
        }
    }, 300);
});

// ============================================
// PROJECT MODAL
// ============================================
const projectModal = document.getElementById('project-modal');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalTags = document.getElementById('modal-tags');
const modalLink = document.getElementById('modal-link');
const modalClose = document.querySelector('.modal-close');

const projects = {
    'va-metasploitable': {
        icon: '🛡️',
        name: 'Vulnerability Assessment — Metasploitable',
        desc: 'Conducted VA using Nessus Scanner, identified 122 vulnerabilities: 7 Critical, 4 High, 15 Medium. Documented critical findings with CVSS scoring including VNC weak password (10.0), UnrealIRCd backdoor (CVE-2010-2075), phpMyAdmin SQLi (CVE-2019-11768), OpenSSL RNG weakness (CVE-2008-0166).',
        tags: ['Nessus', 'CVSS Scoring', 'VA Report', 'Feb 2026'],
        url: 'https://github.com/partha442004/Cybersecurity-Projects/blob/main/Vulnerability_Assessment_Report.pdf'
    },
    'pt-metasploitable': {
        icon: '⚔️',
        name: 'Penetration Testing — Metasploitable 2',
        desc: 'Performed reconnaissance using Nmap (-sV -A), identified 7 open ports. Exploited bindshell on port 1524 using Netcat, gained unauthenticated root access. Identified 5 vulnerabilities: 3 Critical (Bindshell, vsftpd backdoor CVE-2011-2523, UnrealIRCd), 2 High (Samba RCE CVE-2007-2447, Tomcat defaults).',
        tags: ['Nmap', 'Metasploit', 'Root Shell', 'May 2026'],
        url: 'https://github.com/partha442004/Cybersecurity-Projects/blob/main/Pentest_Report_Filled.pdf'
    },
    'cyberguide': {
        icon: '🤖',
        name: 'CyberGuide',
        desc: 'Career Intelligence Platform: 17+ scrapers, AI job matching, 2040 tests at 99% coverage. Deployed on Vercel + Neon.',
        tags: ['Python', 'AI', 'Web Scraping', 'MIT License'],
        url: 'https://github.com/partha442004/CyberGuide'
    },
    'web-attack': {
        icon: '⚔️',
        name: 'web-attack-academy',
        desc: 'Web attack learning platform for cybersecurity training.',
        tags: ['JavaScript', 'Web Security'],
        url: 'https://github.com/partha442004/web-attack-academy'
    },
    'osint-locator': {
        icon: '📍',
        name: 'osint-locator',
        desc: 'OSINT location intelligence tool for gathering geographic data.',
        tags: ['Python', 'OSINT'],
        url: 'https://github.com/partha442004/osint-locator'
    },
    'cyber-projects': {
        icon: '🔐',
        name: 'Cybersecurity-Projects',
        desc: 'VAPT Reports, Penetration Testing, and Cybersecurity Projects collection.',
        tags: ['Cybersecurity', 'VAPT', 'Pentesting'],
        url: 'https://github.com/partha442004/Cybersecurity-Projects'
    }
};

const chestSlots = document.querySelectorAll('.chest-slot');
chestSlots.forEach(slot => {
    slot.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectId = slot.dataset.project;
        const project = projects[projectId];
        
        if (project) {
            modalIcon.textContent = project.icon;
            modalTitle.textContent = project.name;
            modalDesc.textContent = project.desc;
            modalTags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
            modalLink.href = project.url;
            projectModal.classList.remove('hidden');
        }
    });
});

modalClose.addEventListener('click', () => {
    projectModal.classList.add('hidden');
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.add('hidden');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
        projectModal.classList.add('hidden');
    }
});

// ============================================
// GTA NAVIGATION
// ============================================
const gtaNavItems = document.querySelectorAll('.gta-nav-item');
const gtaSections = document.querySelectorAll('.gta-section');

function switchGtaSection(sectionId) {
    gtaNavItems.forEach(item => {
        item.classList.toggle('active', item.dataset.gtaSection === sectionId);
    });
    gtaSections.forEach(section => {
        section.classList.toggle('active', section.id === sectionId);
    });
}

gtaNavItems.forEach(item => {
    item.addEventListener('click', () => {
        switchGtaSection(item.dataset.gtaSection);
    });
});

// ============================================
// ENCHANTMENT TABLE HOVER EFFECTS
// ============================================
const enchantSlots = document.querySelectorAll('.enchant-slot');

enchantSlots.forEach(slot => {
    slot.addEventListener('mouseenter', () => {
        const glyphs = document.querySelector('.enchant-glyphs');
        if (glyphs) {
            glyphs.style.animationDuration = '1s';
            setTimeout(() => {
                glyphs.style.animationDuration = '5s';
            }, 500);
        }
    });
});

// ============================================
// SKILL BAR ANIMATION ON SCROLL (GTA)
// ============================================
const observerOptions = {
    threshold: 0.5
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.gta-skill-fill');
            fills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

const skillGrid = document.querySelector('.gta-skill-grid');
if (skillGrid) {
    skillObserver.observe(skillGrid);
}

// ============================================
// XP BAR ANIMATION (MINECRAFT)
// ============================================
const xpFill = document.querySelector('.mc-xp-fill');
if (xpFill) {
    const targetWidth = xpFill.style.width;
    xpFill.style.width = '0%';
    
    setTimeout(() => {
        xpFill.style.width = targetWidth;
    }, 500);
}

// ============================================
// PARTICLE EFFECTS
// ============================================
function createParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: ${color};
        pointer-events: none;
        z-index: 9999;
        animation: particleFade 0.6s ease-out forwards;
    `;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes particleFade {
        0% { opacity: 1; transform: translate(0, 0) scale(1); }
        100% { opacity: 0; transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -30}px) scale(0); }
    }
`;
document.head.appendChild(style);

mcChest?.addEventListener('click', (e) => {
    const colors = ['#FFD700', '#55FF55', '#FF6B9D'];
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createParticle(
                e.clientX + Math.random() * 20 - 10,
                e.clientY + Math.random() * 20 - 10,
                colors[Math.floor(Math.random() * colors.length)]
            );
        }, i * 50);
    }
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// ============================================
// TYPING ANIMATION
// ============================================
const typingElement = document.getElementById('typing-tagline');
const phrases = [
    'Cybersecurity',
    'Vulnerability Assessment',
    'Penetration Testing',
    'SOC Analyst',
    '127+ Vulnerabilities Found',
    'CEH v13 Certified'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    if (!typingElement) return;
    
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }
    
    setTimeout(typeEffect, typingSpeed);
}

setTimeout(typeEffect, 1000);

// ============================================
// MATRIX RAIN (GTA THEME)
// ============================================
const matrixCanvas = document.getElementById('matrix-canvas');
const ctx = matrixCanvas?.getContext('2d');

function initMatrix() {
    if (!matrixCanvas || !ctx) return;
    
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        if (!gtaTheme.classList.contains('active')) {
            ctx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            return;
        }
        
        ctx.fillStyle = 'rgba(26, 10, 46, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#FF6B9D';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
        
        requestAnimationFrame(drawMatrix);
    }
    
    drawMatrix();
}

initMatrix();

window.addEventListener('resize', () => {
    if (matrixCanvas) {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    }
});

// ============================================
// ACHIEVEMENT POPUPS
// ============================================
function showAchievement(icon, label, title) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <span class="achievement-icon">${icon}</span>
        <div class="achievement-text">
            <span class="achievement-label">${label}</span>
            <span class="achievement-title">${title}</span>
        </div>
    `;
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.remove();
    }, 4000);
}

// Show achievements on section visits
let achievementsShown = {};

function checkAchievements(sectionId) {
    if (achievementsShown[sectionId]) return;
    achievementsShown[sectionId] = true;
    
    switch(sectionId) {
        case 'skills':
            setTimeout(() => showAchievement('⚔️', 'Achievement Unlocked!', 'Skill Master - 9 Security Tools'), 500);
            break;
        case 'projects':
            setTimeout(() => showAchievement('🛡️', 'Achievement Unlocked!', 'Bug Hunter - 127+ Vulns Found'), 500);
            break;
        case 'about':
            setTimeout(() => showAchievement('🎓', 'Achievement Unlocked!', 'Scholar - CEH v13 Certified'), 500);
            break;
    }
}

// Watch for section changes
const sectionObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target;
            if (target.classList.contains('mc-section') && target.classList.contains('active')) {
                checkAchievements(target.id.replace('mc-', ''));
            }
        }
    });
});

document.querySelectorAll('.mc-section').forEach(section => {
    sectionObserver.observe(section, { attributes: true });
});

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log('%c🎮 Portfolio by Parthasarathi B', 'font-size: 20px; font-weight: bold; color: #55FF55;');
console.log('%cCybersecurity • VAPT • SOC 🛡️', 'font-size: 14px; color: #FFAA00;');
console.log('%cGitHub: https://github.com/partha442004', 'font-size: 12px; color: #87CEEB;');
console.log('%cTryHackMe: https://tryhackme.com/p/parthasarathi442', 'font-size: 12px; color: #FF6B9D;');
