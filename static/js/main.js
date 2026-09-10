/**
 * Yamini Parmar - Developer Portfolio Main Script
 * Handles Interactive UI, Theme Toggler, Modals, Chatbot Simulator & AJAX forms
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypewriter();
    initNavbarScroll();
    initSkillFilters();
    initContactForm();
    initFooterYear();
    initFoodWasteApp();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Light / Dark Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('yamini_portfolio_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('yamini_portfolio_theme', newTheme);
            showToast(`Switched to ${newTheme.toUpperCase()} theme`, 'info');
        });
    }
}

/* --------------------------------------------------------------------------
   2. Typewriter Effect
   -------------------------------------------------------------------------- */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;

    const words = [
        "Python Applications",
        "NLP College Chatbots",
        "Web Platforms",
        "Clean Software Solutions"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   3. Navbar Scroll & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Section Scroll-Spy
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const linksList = navMenu.querySelector('.nav-links');
            linksList.classList.toggle('mobile-active');
        });
    }
}

/* --------------------------------------------------------------------------
   4. Skill Category Filter
   -------------------------------------------------------------------------- */
function initSkillFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   5. Interactive Resume Modal
   -------------------------------------------------------------------------- */
function openResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/* --------------------------------------------------------------------------
   6. Interactive AI Chatbot Simulator
   -------------------------------------------------------------------------- */
function openChatbotModal() {
    const modal = document.getElementById('chatbotModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeChatbotModal() {
    const modal = document.getElementById('chatbotModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

const chatbotForm = document.getElementById('chatbotForm');
if (chatbotForm) {
    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const chatInput = document.getElementById('chatInput');
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;

        appendChatMessage(userMsg, 'user');
        chatInput.value = '';

        // Call backend chatbot API
        fetch('/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMsg })
        })
        .then(res => res.json())
        .then(data => {
            appendChatMessage(data.response, 'bot');
        })
        .catch(err => {
            appendChatMessage("Sorry, I encountered an issue connecting to the NLP engine.", 'bot');
        });
    });
}

function sendQuickQuery(queryText) {
    appendChatMessage(queryText, 'user');
    fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText })
    })
    .then(res => res.json())
    .then(data => {
        appendChatMessage(data.response, 'bot');
    });
}

function appendChatMessage(text, sender) {
    const chatWindow = document.getElementById('chatWindow');
    if (!chatWindow) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.textContent = text;

    msgDiv.appendChild(bubble);
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/* --------------------------------------------------------------------------
   7. Food Waste Management Platform Simulator
   -------------------------------------------------------------------------- */
function openFoodWasteModal() {
    const modal = document.getElementById('foodWasteModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        loadFoodItems();
    }
}

function closeFoodWasteModal() {
    const modal = document.getElementById('foodWasteModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchFwTab(tabName) {
    const listTabBtn = document.getElementById('fwListTabBtn');
    const donateTabBtn = document.getElementById('fwDonateTabBtn');
    const listTab = document.getElementById('fwListTab');
    const donateTab = document.getElementById('fwDonateTab');

    if (tabName === 'list') {
        listTabBtn.classList.add('active');
        donateTabBtn.classList.remove('active');
        listTab.classList.add('active');
        donateTab.classList.remove('active');
        loadFoodItems();
    } else {
        donateTabBtn.classList.add('active');
        listTabBtn.classList.remove('active');
        donateTab.classList.add('active');
        listTab.classList.remove('active');
    }
}

function loadFoodItems() {
    const tbody = document.getElementById('foodItemsTbody');
    if (!tbody) return;

    fetch('/api/food-waste/items')
    .then(res => res.json())
    .then(data => {
        tbody.innerHTML = '';
        data.items.forEach(item => {
            const tr = document.createElement('tr');
            const isAvailable = item.status === 'Available';
            
            tr.innerHTML = `
                <td><strong>${escapeHtml(item.donor)}</strong></td>
                <td>${escapeHtml(item.item)}</td>
                <td>${escapeHtml(item.qty)}</td>
                <td>${escapeHtml(item.servings)}</td>
                <td>${escapeHtml(item.location)}</td>
                <td>
                    <span style="color: ${isAvailable ? '#10b981' : '#f59e0b'}; font-weight:600;">
                        <i class="fa-solid ${isAvailable ? 'fa-circle-check' : 'fa-handshake'}"></i> ${escapeHtml(item.status)}
                    </span>
                </td>
                <td>
                    ${isAvailable ? `<button class="btn btn-sm btn-primary" onclick="claimFoodItem(${item.id})">Claim Food</button>` : `<span style="font-size:0.8rem; color:#9ca3af;">Claimed</span>`}
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

function claimFoodItem(itemId) {
    fetch(`/api/food-waste/claim/${itemId}`, { method: 'POST' })
    .then(res => res.json())
    .then(data => {
        showToast(data.message, 'success');
        loadFoodItems();
    });
}

function initFoodWasteApp() {
    const donateForm = document.getElementById('fwDonateForm');
    if (!donateForm) return;

    donateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const donor = document.getElementById('fwDonorName').value.trim();
        const item = document.getElementById('fwItemName').value.trim();
        const qty = document.getElementById('fwQty').value.trim();
        const servings = document.getElementById('fwServings').value.trim();
        const location = document.getElementById('fwLocation').value.trim();

        fetch('/api/food-waste/donate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ donor, item, qty, servings, location })
        })
        .then(res => res.json())
        .then(data => {
            showToast(data.message, 'success');
            donateForm.reset();
            switchFwTab('list');
        });
    });
}

/* --------------------------------------------------------------------------
   8. Contact Form AJAX Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contactSubmitBtn');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !message) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                showToast(data.message, 'success');
                contactForm.reset();
            } else {
                showToast(data.message, 'error');
            }
        })
        .catch(err => {
            showToast('Failed to send message. Please try again.', 'error');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
        });
    });
}

/* --------------------------------------------------------------------------
   9. Helper Utilities
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-circle-xmark';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHtml(message)}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function initFooterYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}
