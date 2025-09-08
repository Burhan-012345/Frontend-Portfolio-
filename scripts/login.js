document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const forms = {
        username: document.getElementById('username-form'),
        password: document.getElementById('password-form'),
        signup: document.getElementById('signup-form')
    };

    const inputs = {
        username: document.getElementById('username'),
        password: document.getElementById('password'),
        newUsername: document.getElementById('new-username'),
        newPassword: document.getElementById('new-password'),
        confirmPassword: document.getElementById('confirm-password')
    };

    const buttons = {
        continue: document.getElementById('continue-btn'),
        signin: document.getElementById('signin-btn'),
        signup: document.getElementById('signup-btn'),
        signupSuggestion: document.getElementById('signup-suggestion-btn')
    };

    const validations = {
        username: document.getElementById('username-validation'),
        password: document.getElementById('password-validation'),
        newUsername: document.getElementById('new-username-validation'),
        newPassword: document.getElementById('new-password-validation'),
        confirmPassword: document.getElementById('confirm-password-validation')
    };

    const toggles = {
        password: document.getElementById('toggle-password'),
        newPassword: document.getElementById('toggle-new-password'),
        confirmPassword: document.getElementById('toggle-confirm-password')
    };

    // Forgot Password Modal Elements
    const forgotModal = document.getElementById('forgot-modal');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const backToLoginLink = document.getElementById('back-to-login-link');
    const resetForm = document.getElementById('resetForm');
    const resetButton = document.getElementById('resetButton');
    const resetUsernameInput = document.getElementById('reset-username');
    const resetNewPasswordInput = document.getElementById('reset-new-password');
    const resetConfirmPasswordInput = document.getElementById('reset-confirm-password');
    const toggleResetPassword = document.getElementById('toggle-reset-password');
    const toggleResetConfirmPassword = document.getElementById('toggle-reset-confirm-password');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const resetPasswordStrengthBar = document.getElementById('reset-password-strength-bar');

    // Constants
    const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const RESERVED_USERNAMES = ['admin', 'root', 'system', 'user', 'test'];

    // Password requirements
    const passwordRequirements = {
        minLength: 8,
        maxLength: 64,
        requireUpper: true,
        requireLower: true,
        requireNumber: true,
        requireSpecial: true
    };

    // Initialize
    function init() {
        setupPasswordToggles();
        setupEventListeners();
        initializePasswordFields();
        setupForgotPasswordModal();
    }

    function setupPasswordToggles() {
        Object.entries(toggles).forEach(([key, toggle]) => {
            if (toggle) {
                toggle.addEventListener('click', () => {
                    const inputKey = key === 'password' ? 'password' : 
                                   key === 'newPassword' ? 'newPassword' : 'confirmPassword';
                    togglePasswordVisibility(inputs[inputKey], toggle);
                });
            }
        });
    }

    function togglePasswordVisibility(input, icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    function initializePasswordFields() {
        if (inputs.password) inputs.password.type = 'password';
        if (inputs.newPassword) inputs.newPassword.type = 'password';
        if (inputs.confirmPassword) inputs.confirmPassword.type = 'password';
    }

    function setupForgotPasswordModal() {
        // Toggle password visibility in modal
        toggleResetPassword.addEventListener('click', () => {
            const isPassword = resetNewPasswordInput.type === 'password';
            resetNewPasswordInput.type = isPassword ? 'text' : 'password';
            toggleResetPassword.querySelector('span').textContent = isPassword ? 'visibility' : 'visibility_off';
        });

        toggleResetConfirmPassword.addEventListener('click', () => {
            const isPassword = resetConfirmPasswordInput.type === 'password';
            resetConfirmPasswordInput.type = isPassword ? 'text' : 'password';
            toggleResetConfirmPassword.querySelector('span').textContent = isPassword ? 'visibility' : 'visibility_off';
        });

        // Real-time password strength feedback
        resetNewPasswordInput.addEventListener('input', updateResetPasswordStrength);

        // Form submission
        resetForm.addEventListener('submit', handleResetFormSubmit);

        // Forgot password link
        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => {
                e.preventDefault();
                forgotModal.classList.remove('hidden');
                resetUsernameInput.value = inputs.username.value;
            });
        }

        // Back to login link
        if (backToLoginLink) {
            backToLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                forgotModal.classList.add('hidden');
            });
        }
    }

    function updateResetPasswordStrength() {
        const password = resetNewPasswordInput.value;
        const strength = calculatePasswordStrength(password);
        resetPasswordStrengthBar.style.width = `${strength}%`;
        
        // Update color based on strength
        if (strength < 40) {
            resetPasswordStrengthBar.style.backgroundColor = '#f72585'; // Weak (red)
        } else if (strength < 70) {
            resetPasswordStrengthBar.style.backgroundColor = '#f8961e'; // Medium (orange)
        } else {
            resetPasswordStrengthBar.style.backgroundColor = '#4cc9f0'; // Strong (teal)
        }
    }

    function handleResetFormSubmit(event) {
        event.preventDefault();
        clearMessages();

        const username = resetUsernameInput.value.trim();
        const newPassword = resetNewPasswordInput.value;
        const confirmPassword = resetConfirmPasswordInput.value;

        // Validate inputs
        const validation = validateResetInputs(username, newPassword, confirmPassword);
        if (!validation.isValid) {
            showError(validation.message);
            return;
        }

        // Show loading state
        setLoading(true);

        // Simulate API call (replace with actual API call in production)
        simulatePasswordReset(username, newPassword)
            .then(() => {
                showSuccess('Password reset successfully! Redirecting to login page...');
                // Close modal and redirect to login page after 2 seconds
                setTimeout(() => {
                    forgotModal.classList.add('hidden');
                    showForm('username');
                }, 2000);
            })
            .catch(error => {
                showError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function validateResetInputs(username, newPassword, confirmPassword) {
        // Validate username
        if (!username) {
            return { isValid: false, message: 'Username is required' };
        }

        // Validate new password
        if (!newPassword) {
            return { isValid: false, message: 'New password is required' };
        }

        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.isValid) {
            return passwordValidation;
        }

        // Confirm password match
        if (newPassword !== confirmPassword) {
            return { isValid: false, message: 'Passwords do not match' };
        }

        return { isValid: true };
    }

    function simulatePasswordReset(username, newPassword) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // Simulate random success/failure for demo purposes
                const shouldSucceed = Math.random() > 0.2; // 80% success rate
                
                if (shouldSucceed) {
                    resolve();
                } else {
                    reject(new Error('Failed to reset password. Please try again later.'));
                }
            }, 1500);
        });
    }

    function clearMessages() {
        errorMessage.classList.add('hidden');
        successMessage.classList.add('hidden');
    }

    function showError(message) {
        errorMessage.querySelector('.message-text').textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function showSuccess(message) {
        successMessage.querySelector('.message-text').textContent = message;
        successMessage.classList.remove('hidden');
    }

    function setLoading(isLoading) {
        if (isLoading) {
            resetButton.disabled = true;
            resetButton.innerHTML = '<span class="material-symbols-outlined">lock_reset</span> Processing...';
        } else {
            resetButton.disabled = false;
            resetButton.innerHTML = '<span class="material-symbols-outlined">lock_reset</span> Reset Password';
        }
    }

    function setupEventListeners() {
        // Button clicks
        if (buttons.continue) buttons.continue.addEventListener('click', handleContinue);
        if (buttons.signin) buttons.signin.addEventListener('click', handleSignIn);
        if (buttons.signup) buttons.signup.addEventListener('click', handleSignUp);
        if (buttons.signupSuggestion) buttons.signupSuggestion.addEventListener('click', showSignupForm);

        // Back buttons
        const backToUsername = document.getElementById('back-to-username');
        if (backToUsername) backToUsername.addEventListener('click', () => showForm('username'));
        
        const backToUsernameSignup = document.getElementById('back-to-username-signup');
        if (backToUsernameSignup) backToUsernameSignup.addEventListener('click', () => showForm('username'));

        // Keyboard support
        if (inputs.username) inputs.username.addEventListener('keyup', (e) => e.key === 'Enter' && handleContinue());
        if (inputs.password) inputs.password.addEventListener('keyup', (e) => e.key === 'Enter' && handleSignIn());
        if (inputs.newUsername) inputs.newUsername.addEventListener('keyup', (e) => e.key === 'Enter' && handleSignUp());
        if (inputs.newPassword) inputs.newPassword.addEventListener('keyup', (e) => e.key === 'Enter' && handleSignUp());
        if (inputs.confirmPassword) inputs.confirmPassword.addEventListener('keyup', (e) => e.key === 'Enter' && handleSignUp());

        // Real-time validation
        if (inputs.newPassword) inputs.newPassword.addEventListener('input', updatePasswordStrength);
    }

    function showForm(formName) {
        Object.values(forms).forEach(form => {
            if (form) form.classList.add('hidden');
        });
        if (forms[formName]) forms[formName].classList.remove('hidden');
        clearValidationMessages();
    }

    function clearValidationMessages() {
        Object.values(validations).forEach(el => {
            if (el) el.textContent = '';
        });
    }

    function validateUsername(username) {
        if (!username) return 'Username is required';
        if (username.length < 3) return 'Username must be at least 3 characters';
        if (username.length > 20) return 'Username must be less than 20 characters';
        if (!USERNAME_REGEX.test(username)) return 'Only letters, numbers and underscores allowed';
        if (RESERVED_USERNAMES.includes(username.toLowerCase())) return 'This username is not available';
        if (username.startsWith('_') || username.endsWith('_')) return 'Username cannot start or end with underscore';
        if (/\s/.test(username)) return 'Username cannot contain spaces';
        return '';
    }

    function validatePassword(password) {
        if (!password) return 'Password is required';
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (password.length > 64) return 'Password must be less than 64 characters';
        if (!PASSWORD_REGEX.test(password)) {
            return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        }
        if (/(.)\1{3,}/.test(password)) return 'Password contains too many repeating characters';
        return '';
    }

    function calculatePasswordStrength(password) {
        if (!password) return 0;
        
        let strength = 0;
        
        // Length contributes up to 40 points
        strength += Math.min(password.length * 3, 40);
        
        // Character variety contributes up to 30 points
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        
        strength += (hasLower + hasUpper + hasNumber + hasSpecial) * 7.5;
        
        // Deductions for poor patterns
        if (/123|abc|qwerty|password/i.test(password)) strength -= 20;
        if (/(.)\1{2,}/.test(password)) strength -= 15;
        
        // Cap between 0-100
        return Math.max(0, Math.min(100, strength));
    }

    function updatePasswordStrength() {
        const password = inputs.newPassword.value;
        const strengthBar = document.getElementById('strength-bar');
        const strengthText = document.getElementById('strength-text');
        
        if (!password || !strengthBar || !strengthText) return;

        let strength = calculatePasswordStrength(password);
        
        strengthBar.style.width = `${strength}%`;
        
        if (strength < 40) {
            strengthBar.style.backgroundColor = 'var(--error-color)';
            strengthText.textContent = 'Weak';
            strengthText.style.color = 'var(--error-color)';
        } else if (strength < 70) {
            strengthBar.style.backgroundColor = 'var(--warning-color)';
            strengthText.textContent = 'Medium';
            strengthText.style.color = 'var(--warning-color)';
        } else if (strength < 90) {
            strengthBar.style.backgroundColor = 'var(--success-color)';
            strengthText.textContent = 'Strong';
            strengthText.style.color = 'var(--success-color)';
        } else {
            strengthBar.style.backgroundColor = 'var(--primary-color)';
            strengthText.textContent = 'Very Strong';
            strengthText.style.color = 'var(--primary-color)';
        }
    }

    async function handleContinue() {
        const username = inputs.username.value.trim();
        const error = validateUsername(username);
        
        if (error) {
            if (validations.username) validations.username.textContent = error;
            return;
        }
        
        document.querySelectorAll('.username-highlight').forEach(el => el.textContent = username);
        if (inputs.newUsername) inputs.newUsername.value = username;
        
        showForm('password');
    }

    async function handleSignIn() {
        const username = inputs.username.value.trim();
        const password = inputs.password.value;
        
        const userError = validateUsername(username);
        const passError = validatePassword(password);
        
        if (userError || passError) {
            if (userError && validations.username) validations.username.textContent = userError;
            if (passError && validations.password) validations.password.textContent = passError;
            return;
        }
        
        // Store user session
        localStorage.setItem('loggedInUser', username);
        sessionStorage.setItem('justLoggedIn', 'true');
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }

    async function handleSignUp() {
        const username = inputs.newUsername.value.trim();
        const password = inputs.newPassword.value;
        const confirmPassword = inputs.confirmPassword.value;
        
        // Validate
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);
        
        if (usernameError || passwordError) {
            if (usernameError && validations.newUsername) validations.newUsername.textContent = usernameError;
            if (passwordError && validations.newPassword) validations.newPassword.textContent = passwordError;
            return;
        }
        
        if (password !== confirmPassword) {
            if (validations.confirmPassword) validations.confirmPassword.textContent = 'Passwords do not match';
            return;
        }
        
        const COMMON_PASSWORDS = ['password', '123456', 'qwerty', 'letmein'];
        if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
            if (validations.newPassword) validations.newPassword.textContent = 'This password is too common. Please choose a stronger one.';
            return;
        }
        
        // Store user session
        localStorage.setItem('loggedInUser', username);
        sessionStorage.setItem('justLoggedIn', 'true');
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }

    function showSignupForm() {
        const username = inputs.username.value.trim();
        if (inputs.newUsername) inputs.newUsername.value = username;
        document.querySelectorAll('.username-highlight').forEach(el => el.textContent = username);
        showForm('signup');
    }

    // Initialize the application
    init();
});