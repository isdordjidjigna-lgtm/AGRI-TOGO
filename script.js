// Menu hamburger pour mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Fermer le menu mobile lors du clic sur un lien
const navLinksItems = document.querySelectorAll('.nav-links a');
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Validation du formulaire de contact
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Validation du nom
        const nom = document.getElementById('nom');
        const nomGroup = nom.closest('.form-group');
        const nomError = nomGroup.querySelector('.error-message');
        
        if (nom.value.trim() === '') {
            nomGroup.classList.add('error');
            nomError.textContent = 'Le nom est obligatoire';
            isValid = false;
        } else if (nom.value.trim().length < 2) {
            nomGroup.classList.add('error');
            nomError.textContent = 'Le nom doit contenir au moins 2 caractères';
            isValid = false;
        } else {
            nomGroup.classList.remove('error');
            nomError.textContent = '';
        }
        
        // Validation de l'email
        const email = document.getElementById('email');
        const emailGroup = email.closest('.form-group');
        const emailError = emailGroup.querySelector('.error-message');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email.value.trim() === '') {
            emailGroup.classList.add('error');
            emailError.textContent = 'L\'email est obligatoire';
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            emailGroup.classList.add('error');
            emailError.textContent = 'Veuillez entrer une adresse email valide';
            isValid = false;
        } else {
            emailGroup.classList.remove('error');
            emailError.textContent = '';
        }
        
        // Validation du sujet
        const sujet = document.getElementById('sujet');
        const sujetGroup = sujet.closest('.form-group');
        const sujetError = sujetGroup.querySelector('.error-message');
        
        if (sujet.value === '') {
            sujetGroup.classList.add('error');
            sujetError.textContent = 'Veuillez choisir un sujet';
            isValid = false;
        } else {
            sujetGroup.classList.remove('error');
            sujetError.textContent = '';
        }
        
        // Validation du message
        const message = document.getElementById('message');
        const messageGroup = message.closest('.form-group');
        const messageError = messageGroup.querySelector('.error-message');
        
        if (message.value.trim() === '') {
            messageGroup.classList.add('error');
            messageError.textContent = 'Le message est obligatoire';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            messageGroup.classList.add('error');
            messageError.textContent = 'Le message doit contenir au moins 10 caractères';
            isValid = false;
        } else {
            messageGroup.classList.remove('error');
            messageError.textContent = '';
        }
        
        // Si le formulaire est valide
        if (isValid) {
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
            
            // Réinitialiser le formulaire après 3 secondes
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.classList.remove('show');
            }, 5000);
        }
    });
    
    // Supprimer les erreurs lors de la saisie
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            const group = input.closest('.form-group');
            group.classList.remove('error');
            const error = group.querySelector('.error-message');
            if (error) {
                error.textContent = '';
            }
        });
    });
}

// Carrousel
const carrouselContainer = document.querySelector('.carrousel-container');
const carrouselSlides = document.querySelectorAll('.carrousel-slide');
const carrouselPrev = document.querySelector('.carrousel-prev');
const carrouselNext = document.querySelector('.carrousel-next');
const indicators = document.querySelectorAll('.indicator');

if (carrouselContainer && carrouselSlides.length > 0) {
    let currentSlide = 0;
    const totalSlides = carrouselSlides.length;
    
    function showSlide(index) {
        carrouselSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            indicators[i].classList.remove('active');
        });
        
        currentSlide = (index + totalSlides) % totalSlides;
        carrouselSlides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    if (carrouselPrev) {
        carrouselPrev.addEventListener('click', prevSlide);
    }
    
    if (carrouselNext) {
        carrouselNext.addEventListener('click', nextSlide);
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Défilement automatique
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Pause au survol
    carrouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });
    
    carrouselContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });
}

// Filtrage des produits (bonus)
const filtreBtns = document.querySelectorAll('.filtre-btn');
const produits = document.querySelectorAll('.produit');

if (filtreBtns.length > 0 && produits.length > 0) {
    filtreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filtreBtns.forEach(b => b.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');
            
            const filtre = btn.getAttribute('data-filtre');
            
            produits.forEach(produit => {
                const categorie = produit.getAttribute('data-categorie');
                
                if (filtre === 'tous' || categorie === filtre) {
                    produit.classList.remove('hidden');
                    produit.style.display = 'block';
                } else {
                    produit.classList.add('hidden');
                    produit.style.display = 'none';
                }
            });
        });
    });
}

// Mode sombre (bonus)
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '🌙';
themeToggle.setAttribute('aria-label', 'Basculer mode sombre');
document.body.appendChild(themeToggle);

let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Appliquer le mode sombre au chargement
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '☀️';
}

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        themeToggle.innerHTML = '☀️';
    } else {
        themeToggle.innerHTML = '🌙';
    }
});

// Animation au défilement (bonus)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les sections pour l'animation
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Animation immédiate pour la première section (hero)
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}

// Animation immédiate pour le header
const header = document.querySelector('header');
if (header) {
    header.style.opacity = '1';
    header.style.transform = 'translateY(0)';
}

// Navigation active basée sur la position de défilement
const sectionsList = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sectionsList.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll doux pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('Script AGRI-TOGO chargé avec succès !');