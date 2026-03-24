document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'rgba(10,10,12,0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }

    // GSAP Page Load Animations
    gsap.from('.navbar', { y: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    
    // Animate content elements
    const elementsToAnimate = document.querySelectorAll('.animate-up');
    if (elementsToAnimate.length > 0) {
        gsap.from(elementsToAnimate, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }

    // ScrollTrigger Animations for product cards
    gsap.registerPlugin(ScrollTrigger);
    
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0) {
        gsap.from(productCards, {
            scrollTrigger: {
                trigger: '.product-grid',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });
    }

    // Fetch Cart Count
    fetchCartCount();
});

async function fetchCartCount() {
    try {
        const res = await fetch('/api/cart/count');
        const data = await res.json();
        const badge = document.getElementById('cart-count');
        if(badge) {
            badge.textContent = data.count || 0;
            if (data.count > 0) {
                gsap.from(badge, { scale: 1.5, duration: 0.3, ease: 'elastic.out' });
            }
        }
    } catch(err) {
        console.error('Error fetching cart count:', err);
    }
}
