// 1. Mobile Menu Toggle Logic
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
        Object.assign(navLinks.style, {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '60px',
            left: '0',
            width: '100%',
            background: 'white',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 5px 10px rgba(0,0,0,0.1)'
        });
    } else {
        navLinks.style.display = 'none';
    }
});

// 2. Scroll Reveal Animation Logic
const revealElements = document.querySelectorAll('.project-card, .skill-card');

// Initial setup for cards
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', () => {
    revealElements.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }
    });
});

//  Copy Email Logic
function copyEmail() {
    const email = document.getElementById("emailText").innerText;
    const message = document.getElementById("copyMessage");

    navigator.clipboard.writeText(email).then(() => {
        message.classList.add("show");
        setTimeout(() => {
            message.classList.remove("show");
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}


window.addEventListener('load', () => {
    const name = document.querySelector('.typing-animation');
    if (name) name.style.opacity = '1';
});