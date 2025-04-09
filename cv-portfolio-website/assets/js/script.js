// Navigation Toggle
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');

navToggle.addEventListener('click', () => {
    navList.classList.toggle('nav__list--active');
    console.log('Navigation toggled');
});

// Particle Background for Hero Section
const heroSection = document.getElementById('home');
const canvas = document.getElementById('particle-bg');
const ctx = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx && heroSection) {
    // Set canvas dimensions to match the Hero section
    const setCanvasSize = () => {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
        console.log('Canvas resized:', canvas.width, 'x', canvas.height);
    };

    setCanvasSize(); // Initial size

    const particlesArray = [];
    const numberOfParticles = 200;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 8 + 5;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.strokeStyle = 'rgba(0, 221, 235, 0.3)';
            ctx.shadowColor = 'rgba(0, 221, 235, 0.5)';
            ctx.shadowBlur = 10;
            ctx.lineWidth = 2;
            ctx.beginPath();
            // Draw a line from the particle's current position to a point behind it based on its speed
            const length = this.size * 2; // Length of the streak
            const endX = this.x - this.speedX * length;
            const endY = this.y - this.speedY * length;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }

    function initParticles() {
        particlesArray.length = 0;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
        console.log('Particles initialized:', particlesArray.length);
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        console.log('Animation frame running');
        requestAnimationFrame(animateParticles);
    }

    // Initialize particles
    initParticles();
    animateParticles();

    // Resize canvas when the window is resized
    window.addEventListener('resize', () => {
        setCanvasSize();
        initParticles();
    });
} else {
    console.error('Canvas, context, or Hero section not found.');
}

document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.querySelector('.timeline__container');
    const leftBtn = document.querySelector('.timeline__scroll-btn--left');
    const rightBtn = document.querySelector('.timeline__scroll-btn--right');

    const updateArrowVisibility = () => {
        const scrollLeft = timelineContainer.scrollLeft;
        const maxScroll = timelineContainer.scrollWidth - timelineContainer.clientWidth;

        leftBtn.style.display = scrollLeft <= 0 ? 'none' : 'block';
        rightBtn.style.display = scrollLeft >= maxScroll - 1 ? 'none' : 'block';
    };

    timelineContainer.addEventListener('scroll', updateArrowVisibility);
    updateArrowVisibility(); // Initial check
});

// Project Filter Functionality
const filterButtons = document.querySelectorAll('.projects__filter-btn');
const projectCategories = document.querySelectorAll('.projects__category');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('projects__filter-btn--active'));
        button.classList.add('projects__filter-btn--active');

        // Show/hide categories
        projectCategories.forEach(category => {
            if (filter === 'all') {
                category.style.display = 'block';
            } else if (category.querySelector('.projects__grid').classList.contains(`projects__grid--${filter}`)) {
                category.style.display = 'block';
            } else {
                category.style.display = 'none';
            }
        });
    });
});