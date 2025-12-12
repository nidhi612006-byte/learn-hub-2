// script.js - Clean, commented JavaScript for beginners
// =============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality when page loads
    initNavigation();
    initPageSwitching();
    initMobileMenu();
    initForms();
    initCourseButtons();
    initQuiz();
    initScrollEffects();
});

// Navigation & Page Switching
function initNavigation() {
    // Smooth scrolling effect when navbar has scroll class
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initPageSwitching() {
    // Handle page switching when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            switchPage(targetPage);
        });
    });
    
    // Handle buttons that switch pages (Explore Courses, Get Started, etc.)
    const pageSwitchButtons = document.querySelectorAll('[data-page]');
    pageSwitchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetPage = this.getAttribute('data-page');
            switchPage(targetPage);
        });
    });
}

function switchPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Form Handling
function initForms() {
    // Login Form
    const loginForm = document.querySelector('.auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('🎉 Login successful! Welcome to LearnHub!');
            switchPage('courses');
        });
    }
    
    // Registration Form (second .auth-form)
    const registerForms = document.querySelectorAll('.auth-form');
    if (registerForms[1]) {
        registerForms[1].addEventListener('submit', function(e) {
            e.preventDefault();
            alert('🎉 Registration successful! Please login to continue.');
            switchPage('login');
        });
    }
    
    // Payment Form
    const paymentForm = document.querySelector('.payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✅ Payment successful! Check your email for course access.');
            switchPage('courses');
        });
    }
    
    // Format card number input
    const cardNumber = document.querySelector('input[placeholder="Card Number"]');
    if (cardNumber) {
        cardNumber.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }
}

// Course Buttons
function initCourseButtons() {
    const courseButtons = document.querySelectorAll('.course-btn');
    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('🎓 Course enrolled successfully! Check your dashboard.');
            switchPage('payment');
        });
    });
}

// Quiz Functionality
function initQuiz() {
    let currentQuestion = 1;
    const totalQuestions = 5;
    const correctAnswers = ['a', 'a', 'a', 'a', 'a']; // Correct answers array
    
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // Check if answer is selected
            const currentRadio = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
            if (!currentRadio) {
                alert('Please select an answer!');
                return;
            }
            
            // Hide current question
            const currentQ = document.getElementById(`question${currentQuestion}`);
            if (currentQ) currentQ.classList.add('hidden');
            
            // Show next question
            currentQuestion++;
            
            if (currentQuestion <= totalQuestions) {
                const nextQ = document.getElementById(`question${currentQuestion}`);
                if (nextQ) nextQ.classList.remove('hidden');
                updateProgress(currentQuestion, totalQuestions);
            } else {
                // Show submit button
                nextBtn.classList.add('hidden');
                if (submitBtn) submitBtn.classList.remove('hidden');
            }
        });
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            let score = 0;
            
            // Calculate score
            for (let i = 1; i <= totalQuestions; i++) {
                const selected = document.querySelector(`input[name="q${i}"]:checked`);
                if (selected && selected.value === correctAnswers[i-1]) {
                    score++;
                }
            }
            
            showQuizResult(score, totalQuestions);
        });
    }
}

function updateProgress(currentQuestion, totalQuestions) {
    const progress = ((currentQuestion - 1) / totalQuestions) * 100;
    const progressFill = document.getElementById('progressFill');
    const questionCount = document.getElementById('questionCount');
    
    if (progressFill) progressFill.style.width = progress + '%';
    if (questionCount) questionCount.textContent = `Question ${currentQuestion} of ${totalQuestions}`;
}

function showQuizResult(score, total) {
    const percentage = Math.round((score / total) * 100);
    const resultDiv = document.getElementById('quizResult');
    const resultScore = document.getElementById('resultScore');
    const resultMessage = document.getElementById('resultMessage');
    
    const quizActions = document.querySelector('.quiz-actions');
    
    if (quizActions) quizActions.classList.add('hidden');
    if (resultDiv) resultDiv.classList.remove('hidden');
    
    if (resultScore) {
        if (percentage >= 80) {
            resultScore.textContent = `🎉 Excellent! ${score}/${total}`;
            if (resultMessage) resultMessage.textContent = 'You have mastered HTML & CSS basics!';
        } else if (percentage >= 60) {
            resultScore.textContent = `👍 Good Job! ${score}/${total}`;
            if (resultMessage) resultMessage.textContent = 'Nice work! Review the concepts you missed.';
        } else {
            resultScore.textContent = `📚 Keep Learning! ${score}/${total}`;
            if (resultMessage) resultMessage.textContent = 'Practice more to improve your skills!';
        }
    }
}

function resetQuiz() {
    const currentQuestion = 1;
    document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));
    const firstQuestion = document.getElementById('question1');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const quizResult = document.getElementById('quizResult');
    const quizActions = document.querySelector('.quiz-actions');
    const progressFill = document.getElementById('progressFill');
    const questionCount = document.getElementById('questionCount');
    
    if (firstQuestion) firstQuestion.classList.remove('hidden');
    if (nextBtn) nextBtn.classList.remove('hidden');
    if (submitBtn) submitBtn.classList.add('hidden');
    if (quizResult) quizResult.classList.add('hidden');
    if (quizActions) quizActions.classList.remove('hidden');
    if (progressFill) progressFill.style.width = '0%';
    if (questionCount) questionCount.textContent = 'Question 1 of 5';
    
    // Clear all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
}

// Scroll Effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for scroll animations
    document.querySelectorAll('.feature-card, .course-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}
