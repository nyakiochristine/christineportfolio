// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
   
    if(navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.right = '0';
        navLinks.style.background = 'white';
        navLinks.style.width = '100%';
        navLinks.style.padding = '2rem';
        navLinks.style.textAlign = 'center';
    } else {
        navLinks.style.display = 'none';
    }
});

// Smooth Scroll Reveal Animation 
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.project-card, .skill-card');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if(revealTop < windowHeight - revealPoint) {
            reveal.style.opacity = '1';
            reveal.style.transform = 'translateY(0)';
        }
    });
});


document.querySelectorAll('.project-card, .skill-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
});

function copyEmail() {
    const email = document.getElementById("emailText").innerText;
    const message = document.getElementById("copyMessage");

    navigator.clipboard.writeText(email).then(() => {
        // "Email copied!" message
        message.classList.add("show");
        
        // Hide it again after 2 seconds
        setTimeout(() => {
            message.classList.remove("show");
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}