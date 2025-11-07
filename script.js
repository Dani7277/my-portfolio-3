// js/script.js - Portfolio Interactivity
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully!');

    // =====================
    // TYPED.JS INTEGRATION
    // =====================
    function initializeTypedJS() {
        if (typeof Typed !== 'undefined') {
            const typed = new Typed('.typed-text', {
                strings: [
                    'Vivian Onyejiaka',
                    'a Web Developer',
                    'a Humber Student', 
                    'a Problem Solver',
                    'Always Learning'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
            console.log('Typed.js animation initialized');
        } else {
            console.log('Typed.js library not loaded');
            // Fallback: Set static text
            document.querySelector('.typed-text').textContent = 'Vivian Onyejiaka';
        }
    }

    // =====================
    // PROJECT GALLERY FUNCTIONALITY
    // =====================
    function initializeProjectGallery() {
        const detailButtons = document.querySelectorAll('.details-btn');
        
        detailButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectCard = this.closest('.project-card');
                const details = this.nextElementSibling;
                const isHidden = details.classList.contains('hidden');
                
                // Close all other open project details
                document.querySelectorAll('.project-details').forEach(detail => {
                    if (detail !== details) {
                        detail.classList.add('hidden');
                    }
                });
                
                // Reset all other buttons to "Show Details"
                document.querySelectorAll('.details-btn').forEach(btn => {
                    if (btn !== this) {
                        btn.textContent = 'Show Details';
                        btn.closest('.project-card').classList.remove('expanded');
                    }
                });
                
                // Toggle current project details
                if (isHidden) {
                    details.classList.remove('hidden');
                    this.textContent = 'Hide Details';
                    projectCard.classList.add('expanded');
                    
                    // Smooth scroll to ensure project is visible
                    projectCard.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                } else {
                    details.classList.add('hidden');
                    this.textContent = 'Show Details';
                    projectCard.classList.remove('expanded');
                }
            });
        });
        
        console.log('Project gallery initialized with ' + detailButtons.length + ' projects');
    }

    // =====================
    // FORM VALIDATION
    // =====================
    function initializeFormValidation() {
        const contactForm = document.getElementById('contact-form');
        
        if (!contactForm) {
            console.log('Contact form not found');
            return;
        }

        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Add real-time validation
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        subjectInput.addEventListener('input', validateSubject);
        messageInput.addEventListener('input', validateMessage);

        // Form submission handler
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Form submission attempted');
            
            let isValid = true;
            clearErrors();
            
            // Validate all fields
            if (!validateName()) isValid = false;
            if (!validateEmail()) isValid = false;
            if (!validateSubject()) isValid = false;
            if (!validateMessage()) isValid = false;
            
            if (isValid) {
                console.log('Form is valid - showing success message');
                showSuccessMessage();
                contactForm.reset();
                clearErrors();
            } else {
                console.log('Form validation failed');
                // Scroll to first error
                const firstError = document.querySelector('.error-message:not(:empty)');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });

        console.log('Form validation initialized');
    }

    // =====================
    // VALIDATION FUNCTIONS
    // =====================
    function validateName() {
        const name = document.getElementById('name').value.trim();
        const nameError = document.getElementById('name-error');
        
        if (name === '') {
            showError('name-error', 'Name is required');
            return false;
        } else if (name.length < 2) {
            showError('name-error', 'Name must be at least 2 characters');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError('name-error', 'Name can only contain letters and spaces');
            return false;
        } else {
            clearError('name-error');
            return true;
        }
    }

    function validateEmail() {
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError('email-error', 'Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            showError('email-error', 'Please enter a valid email address');
            return false;
        } else {
            clearError('email-error');
            return true;
        }
    }

    function validateSubject() {
        const subject = document.getElementById('subject').value.trim();
        
        if (subject === '') {
            showError('subject-error', 'Subject is required');
            return false;
        } else if (subject.length < 5) {
            showError('subject-error', 'Subject must be at least 5 characters');
            return false;
        } else {
            clearError('subject-error');
            return true;
        }
    }

    function validateMessage() {
        const message = document.getElementById('message').value.trim();
        
        if (message === '') {
            showError('message-error', 'Message is required');
            return false;
        } else if (message.length < 10) {
            showError('message-error', 'Message must be at least 10 characters');
            return false;
        } else if (message.length > 500) {
            showError('message-error', 'Message must be less than 500 characters');
            return false;
        } else {
            clearError('message-error');
            return true;
        }
    }

    // =====================
    // HELPER FUNCTIONS
    // =====================
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }

    function showSuccessMessage() {
        const successElement = document.getElementById('form-success');
        if (successElement) {
            successElement.classList.remove('hidden');
            
            // Scroll to success message
            successElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successElement.classList.add('hidden');
            }, 5000);
        }
    }

    // =====================
    // ENHANCED NAVIGATION
    // =====================
    function enhanceNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // =====================
    // FOOTER YEAR UPDATE
    // =====================
    function updateFooterYear() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }

    // =====================
    // INITIALIZE EVERYTHING
    // =====================
    function initializePortfolio() {
        updateFooterYear();
        initializeTypedJS();
        initializeProjectGallery();
        initializeFormValidation();
        enhanceNavigation();
        
        console.log('Portfolio fully initialized with all JavaScript features');
    }

    // Start the portfolio initialization
    initializePortfolio();
});