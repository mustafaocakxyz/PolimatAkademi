// Smooth scroll and interaction enhancements
document.addEventListener('DOMContentLoaded', function() {
    const courseBoxes = document.querySelectorAll('.course-box');
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Mobile menu toggle
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('.nav-link, .btn-login, .btn-signup');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navbar.contains(e.target) && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Add click handlers for smooth navigation
    courseBoxes.forEach(box => {
        box.addEventListener('click', function(e) {
            const link = this.querySelector('.box-link');
            if (link && e.target !== link && !link.contains(e.target)) {
                link.click();
            }
        });
    });

    // Add parallax effect on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        
        if (hero) {
            const scrolled = currentScroll * 0.5;
            hero.style.transform = `translateY(${scrolled}px)`;
            hero.style.opacity = 1 - (currentScroll / 500);
        }
        
        lastScroll = currentScroll;
    });

    // Add intersection observer for fade-in animations
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

    // Observe course boxes
    courseBoxes.forEach(box => {
        observer.observe(box);
    });
});

// Function to update student count (can be called from backend)
function updateStudentCount(count) {
    const studentCountElement = document.querySelector('.student-count');
    if (studentCountElement) {
        studentCountElement.textContent = count + '+';
        studentCountElement.setAttribute('data-count', count);
    }
}

// Example: Update count dynamically
// updateStudentCount(150);

