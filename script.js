// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animated entrance for main content
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelector('main').style.animation = 'fadeInUp 0.5s ease forwards';
});

// Parallax effect for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.style.backgroundPositionY = `-${window.scrollY * 0.5}px`;
});

// Animate blog posts on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.blog-post').forEach(post => {
    observer.observe(post);
});

// Simple form validation for contact page
if (document.querySelector('.contact-form')) {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        // For now, we'll just log it to the console
        console.log('Form submitted');
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
    });
}

// Typewriter effect for the main heading
function typeWriter(element, text, speed = 50) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

const mainHeading = document.querySelector('main h1');
if (mainHeading) {
    const originalText = mainHeading.textContent;
    mainHeading.textContent = '';
    typeWriter(mainHeading, originalText);
}
