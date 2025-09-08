// Mobile Menu Toggle
const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    // Toggle body overflow when menu is open
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            // Update active nav link
            document.querySelectorAll('.nav-links a, .mobile-menu-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Set active nav link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animation on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.details-container, article, .contact-info-container, .hero-image, .about-pic');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements with opacity 0 and slight offset
document.querySelectorAll('.details-container, article, .contact-info-container, .hero-image, .about-pic').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Get Started button functionality
document.querySelector('.floating-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Clear any existing logged in user
    localStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('currentUser');
    
    // Show loading state
    const originalText = this.innerHTML;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
    this.disabled = true;
    
    // Redirect to dashboard after short delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
    
    // Restore button state after 2 seconds (in case redirect fails)
    setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
    }, 2000);
});

// Alert message functionality (for use if needed on index page)
function showAlert(title, message, type = 'default') {
    const alertOverlay = document.createElement('div');
    alertOverlay.className = 'alert-overlay';
    alertOverlay.innerHTML = `
        <div class="alert-box ${type}">
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 
                             type === 'success' ? 'fa-check-circle' : 
                             'fa-info-circle'} alert-icon"></i>
            <h3 class="alert-title">${title}</h3>
            <p class="alert-message">${message}</p>
            <button class="alert-button">OK</button>
        </div>
    `;
    
    document.body.appendChild(alertOverlay);
    
    // Show the alert
    setTimeout(() => {
        alertOverlay.classList.add('active');
    }, 10);
    
    // Close alert when button clicked or overlay clicked
    const alertButton = alertOverlay.querySelector('.alert-button');
    alertButton.addEventListener('click', function() {
        alertOverlay.classList.remove('active');
        setTimeout(() => {
            alertOverlay.remove();
        }, 300);
    });
    
    alertOverlay.addEventListener('click', function(e) {
        if (e.target === alertOverlay) {
            alertOverlay.classList.remove('active');
            setTimeout(() => {
                alertOverlay.remove();
            }, 300);
        }
    });
}

// Initialize any page-specific functionality
function initPage() {
    // Add any page initialization code here
    console.log('Page initialized');
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);
