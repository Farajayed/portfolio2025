document.addEventListener('DOMContentLoaded', function() {
    // Préloader
    const loadingScreen = document.querySelector('.loading');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    }

    // Navigation active et fluide
    const currentPage = window.location.hash || '#formation';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        // Gestion de l'état actif
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mettre à jour l'état actif
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll fluide
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Mettre à jour l'URL sans recharger la page
                history.pushState(null, null, targetId);
            }
            
            // Fermer le menu mobile si ouvert
            if (document.querySelector('nav').classList.contains('active')) {
                document.querySelector('nav').classList.remove('active');
                document.querySelector('.menu-toggle').classList.remove('active');
            }
        });
    });

    // Animation des éléments au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section, .project-card, .tech-icon, .mission-item, .formation-block, .competence-card, .projet-card, .mission-card');
    
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
        
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialiser les éléments avec animation
    const animatedElements = document.querySelectorAll('.section, .project-card, .tech-icon, .mission-item, .formation-block, .competence-card, .projet-card, .mission-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Vérifier au chargement et au défilement
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Gestion de l'accordéon des missions
    const missionTitles = document.querySelectorAll('.mission-title');
    missionTitles.forEach(title => {
        title.addEventListener('click', () => {
            const missionItem = title.parentElement;
            missionItem.classList.toggle('active');
            
            // Fermer les autres items ouverts
            missionTitles.forEach(otherTitle => {
                if (otherTitle !== title && otherTitle.parentElement.classList.contains('active')) {
                    otherTitle.parentElement.classList.remove('active');
                }
            });
        });
    });

    // Boutons de détails des projets
    const projectButtons = document.querySelectorAll('.project-details-btn');
    projectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const details = this.nextElementSibling;
            
            if (details.style.display === 'block') {
                details.style.display = 'none';
                this.textContent = 'Voir détails';
            } else {
                details.style.display = 'block';
                this.textContent = 'Masquer détails';
            }
        });
    });

    // Mode sombre
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        // Détection des préférences système
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        // Vérifier le mode stocké ou les préférences système
        if (localStorage.getItem('darkMode') === 'enabled' || (localStorage.getItem('darkMode') === null && prefersDark)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Effet de particules
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const canvas = document.createElement('canvas');
        canvas.id = 'particles-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        heroSection.appendChild(canvas);

        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            canvas.width = heroSection.offsetWidth;
            canvas.height = heroSection.offsetHeight;

            const particles = [];
            const particleCount = Math.floor(canvas.width / 10);

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: Math.random() * 1 - 0.5,
                    speedY: Math.random() * 1 - 0.5
                });
            }

            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                for (let i = 0; i < particles.length; i++) {
                    particles[i].x += particles[i].speedX;
                    particles[i].y += particles[i].speedY;
                    
                    if (particles[i].x > canvas.width || particles[i].x < 0) {
                        particles[i].speedX = -particles[i].speedX;
                    }
                    if (particles[i].y > canvas.height || particles[i].y < 0) {
                        particles[i].speedY = -particles[i].speedY;
                    }
                    
                    ctx.fillStyle = 'rgba(67, 97, 238, 0.2)';
                    ctx.beginPath();
                    ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                requestAnimationFrame(animateParticles);
            }
            
            animateParticles();
        }
    }

    // Animation du header au scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('header');
        
        if (scrollPosition > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.background = 'rgba(58, 12, 163, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
            header.style.backdropFilter = 'none';
            header.style.background = 'var(--gradient)';
        }
    });

    // Formulaire de contact (gère les deux formulaires)
    const contactForms = [document.getElementById('contact-form'), document.getElementById('formContact')];
    
    contactForms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let name, email;
                
                // Gère les deux structures de formulaire
                if (this.id === 'contact-form') {
                    name = document.getElementById('name').value;
                    email = document.getElementById('email').value;
                } else {
                    const formData = new FormData(this);
                    name = formData.get('nom');
                    email = formData.get('email');
                }
                
                // Simulation d'envoi
                alert(`Merci ${name} ! Votre message a été envoyé. Je vous répondrai à l'adresse ${email} dès que possible.`);
                this.reset();
            });
        }
    });

    // Chargement dynamique des veilles technologiques
    function loadVeilles() {
        const veilles = [
            {
                title: "Nouvelles vulnérabilités Windows",
                date: "15/10/2023",
                source: "ZDNet",
                link: "#"
            },
            {
                title: "Évolutions des solutions de virtualisation",
                date: "08/10/2023",
                source: "LeMagIT",
                link: "#"
            },
            {
                title: "Tendances en cybersécurité 2023",
                date: "01/10/2023",
                source: "01Net",
                link: "#"
            }
        ];
        
        const veilleContainer = document.querySelector('.veille-items');
        
        if (veilleContainer) {
            veilleContainer.innerHTML = '';
            
            veilles.forEach(veille => {
                const veilleItem = document.createElement('div');
                veilleItem.className = 'veille-item';
                veilleItem.innerHTML = `
                    <h4>${veille.title}</h4>
                    <p class="veille-date">${veille.date}</p>
                    <p class="veille-source">Source : ${veille.source}</p>
                    <a href="${veille.link}" class="veille-link">Lire l'article <i class="fas fa-external-link-alt"></i></a>
                `;
                veilleContainer.appendChild(veilleItem);
            });
        }
    }
    
    loadVeilles();

    // Menu mobile (pour les petits écrans)
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('nav').classList.toggle('active');
    });
});