document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const resetForm = document.getElementById('resetForm');
    const resetButton = document.getElementById('resetButton');
    const usernameInput = document.getElementById('username');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const toggleNewPassword = document.getElementById('toggleNewPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const passwordStrengthBar = document.getElementById('passwordStrengthBar');

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
    setupEventListeners();

    function setupEventListeners() {
        // Toggle password visibility
        toggleNewPassword.addEventListener('click', () => togglePasswordVisibility(newPasswordInput, toggleNewPassword));
        toggleConfirmPassword.addEventListener('click', () => togglePasswordVisibility(confirmPasswordInput, toggleConfirmPassword));

        // Real-time password strength feedback
        newPasswordInput.addEventListener('input', updatePasswordStrength);

        // Form submission
        resetForm.addEventListener('submit', handleFormSubmit);
    }

    function togglePasswordVisibility(input, button) {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        button.querySelector('span').textContent = isPassword ? 'visibility' : 'visibility_off';
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        clearMessages();

        const username = usernameInput.value.trim();
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validate inputs
        const validation = validateInputs(username, newPassword, confirmPassword);
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
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            })
            .catch(error => {
                showError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function validateInputs(username, newPassword, confirmPassword) {
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

    function validatePassword(password) {
        // Length check
        if (password.length < passwordRequirements.minLength) {
            return { 
                isValid: false, 
                message: `Password must be at least ${passwordRequirements.minLength} characters` 
            };
        }

        if (password.length > passwordRequirements.maxLength) {
            return { 
                isValid: false, 
                message: `Password must be less than ${passwordRequirements.maxLength} characters` 
            };
        }

        // Character requirements
        const requirements = [];
        
        if (passwordRequirements.requireUpper && !/[A-Z]/.test(password)) {
            requirements.push('one uppercase letter');
        }
        
        if (passwordRequirements.requireLower && !/[a-z]/.test(password)) {
            requirements.push('one lowercase letter');
        }
        
        if (passwordRequirements.requireNumber && !/\d/.test(password)) {
            requirements.push('one number');
        }
        
        if (passwordRequirements.requireSpecial && !/[^A-Za-z0-9]/.test(password)) {
            requirements.push('one special character');
        }

        if (requirements.length > 0) {
            return { 
                isValid: false, 
                message: `Password must contain ${requirements.join(', ')}`
            };
        }

        // Common password check
        const commonPasswords = ['password', '123456', 'qwerty', 'letmein'];
        if (commonPasswords.includes(password.toLowerCase())) {
            return { 
                isValid: false, 
                message: 'This password is too common. Please choose a stronger one.' 
            };
        }

        // Sequential characters check
        if (/(.)\1{2,}/.test(password)) {
            return { 
                isValid: false, 
                message: 'Password contains repeating characters' 
            };
        }

        return { isValid: true };
    }

    function updatePasswordStrength() {
        const password = newPasswordInput.value;
        const strength = calculatePasswordStrength(password);
        passwordStrengthBar.style.width = `${strength}%`;
        
        // Update color based on strength
        if (strength < 40) {
            passwordStrengthBar.style.backgroundColor = '#f72585'; // Weak (red)
        } else if (strength < 70) {
            passwordStrengthBar.style.backgroundColor = '#f8961e'; // Medium (orange)
        } else {
            passwordStrengthBar.style.backgroundColor = '#4cc9f0'; // Strong (teal)
        }
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
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
    }

    function showError(message) {
        errorMessage.querySelector('.message-text').textContent = message;
        errorMessage.style.display = 'flex';
    }

    function showSuccess(message) {
        successMessage.querySelector('.message-text').textContent = message;
        successMessage.style.display = 'flex';
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
});