document.addEventListener('DOMContentLoaded', function() {
    // Check authentication state
    const loggedInUser = localStorage.getItem('loggedInUser');
    const justLoggedIn = sessionStorage.getItem('justLoggedIn') === 'true';
    
    // DOM Elements
    const elements = {
        welcomeMessage: document.getElementById('welcomeMessage'),
        createResumeBtn: document.getElementById('createResumeBtn'),
        logoutBtn: document.getElementById('logoutBtn'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        mobileNav: document.getElementById('mobileNav'),
        mobileUserInfo: document.getElementById('mobileUserInfo'),
        mobileLoginBtn: document.getElementById('mobileLoginBtn'),
        mobileLogoutBtn: document.getElementById('mobileLogoutBtn'),
        overlay: document.getElementById('overlay'),
        closeMobileMenu: document.getElementById('closeMobileMenu')
    };

    // Initialize the dashboard
    initDashboard();

    function initDashboard() {
        updateAuthUI();
        setupEventListeners();
        setupMobileMenu();
    }

    function updateAuthUI() {
        if (loggedInUser) {
            // Update welcome message
            if (elements.welcomeMessage) {
                elements.welcomeMessage.textContent = justLoggedIn 
                    ? `Welcome, ${loggedInUser}! Ready to create your resume?` 
                    : `Welcome back, ${loggedInUser}!`;
                
                // Add animation for new logins
                if (justLoggedIn) {
                    elements.welcomeMessage.classList.add('animate-pop');
                    setTimeout(() => {
                        elements.welcomeMessage.classList.remove('animate-pop');
                    }, 500);
                }
            }
            
            // Update mobile user info
            if (elements.mobileUserInfo) {
                elements.mobileUserInfo.innerHTML = `
                    <div class="mobile-user-info">
                        <i class="fas fa-user-circle"></i>
                        <span>${loggedInUser}</span>
                    </div>
                `;
            }
            
            // Toggle auth buttons
            if (elements.mobileLoginBtn) elements.mobileLoginBtn.style.display = 'none';
            if (elements.mobileLogoutBtn) elements.mobileLogoutBtn.style.display = 'block';
            
            // Clear the justLoggedIn flag
            sessionStorage.removeItem('justLoggedIn');
        } else {
            // Default state for non-logged in users
            if (elements.welcomeMessage) {
                elements.welcomeMessage.textContent = 'Create Your Perfect Resume';
            }
            
            if (elements.mobileUserInfo) {
                elements.mobileUserInfo.innerHTML = '';
            }
            
            if (elements.mobileLoginBtn) elements.mobileLoginBtn.style.display = 'block';
            if (elements.mobileLogoutBtn) elements.mobileLogoutBtn.style.display = 'none';
        }
    }

    function setupEventListeners() {
        // Create Resume button
        if (elements.createResumeBtn) {
            elements.createResumeBtn.addEventListener('click', handleCreateResume);
        }
        
        // Logout button
        if (elements.logoutBtn) {
            elements.logoutBtn.addEventListener('click', handleLogout);
        }
        
        // Mobile logout button
        if (elements.mobileLogoutBtn) {
            elements.mobileLogoutBtn.addEventListener('click', handleLogout);
        }
    }

    function setupMobileMenu() {
        if (!elements.mobileMenuBtn) return;
        
        function toggleMobileMenu() {
            const isOpening = !elements.mobileNav.classList.contains('active');
            
            // Toggle mobile menu state
            elements.mobileNav.classList.toggle('active', isOpening);
            elements.overlay.classList.toggle('active', isOpening);
            document.body.style.overflow = isOpening ? 'hidden' : '';
            
            // Focus first element when opening
            if (isOpening) {
                setTimeout(() => {
                    const firstFocusable = elements.mobileNav.querySelector('button, a, input');
                    if (firstFocusable) firstFocusable.focus();
                }, 100);
            }
        }
        
        // Menu button events
        elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        if (elements.closeMobileMenu) {
            elements.closeMobileMenu.addEventListener('click', toggleMobileMenu);
        }
        
        if (elements.overlay) {
            elements.overlay.addEventListener('click', toggleMobileMenu);
        }
        
        // Close menu when clicking nav links
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            if (!link.id.includes('logout') && !link.id.includes('login')) {
                link.addEventListener('click', toggleMobileMenu);
            }
        });
    }

    function handleCreateResume(e) {
        const user = localStorage.getItem('loggedInUser');
        
        if (!user) {
            e.preventDefault();
            
            // Store intended destination
            localStorage.setItem('redirectAfterLogin', 'resume.html');
            
            // Show alert and redirect
            showAlert({
                type: 'info',
                title: 'Login Required',
                message: 'Please login to create your resume',
                duration: 2000,
                callback: () => {
                    window.location.href = 'login.html';
                }
            });
        } else {
            // Proceed to resume page
            window.location.href = 'resume.html';
        }
    }

    function handleLogout() {
        showAlert({
            type: 'success',
            title: 'Logged Out',
            message: 'You have been logged out successfully',
            duration: 1500,
            callback: () => {
                // Clear user data
                localStorage.removeItem('loggedInUser');
                sessionStorage.removeItem('justLoggedIn');
                
                // Redirect to home page
                window.location.href = 'index.html';
            }
        });
    }

    function showAlert({ type, title, message, duration, callback }) {
        const alertEl = document.createElement('div');
        alertEl.className = `alert alert-${type}`;
        alertEl.innerHTML = `
            <div class="alert-icon">
                <i class="fas fa-${getAlertIcon(type)}"></i>
            </div>
            <div class="alert-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(alertEl);
        
        // Show alert
        setTimeout(() => {
            alertEl.classList.add('show');
        }, 10);
        
        // Hide after duration
        setTimeout(() => {
            alertEl.classList.remove('show');
            setTimeout(() => {
                alertEl.remove();
                if (callback) callback();
            }, 300);
        }, duration);
    }

    function getAlertIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
});