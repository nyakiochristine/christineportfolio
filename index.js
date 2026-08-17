const menuBtn = document.querySelector('#menuBtn');
const navLinks = document.querySelector('#navLinks');

menuBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  menuBtn.setAttribute('aria-expanded', String(isOpen));
  menuBtn.innerHTML = `<i class="fas fa-${isOpen ? 'xmark' : 'bars'}"></i>`;
});

navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('active');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
}));

document.querySelector('#copyEmail').addEventListener('click', async () => {
  const button = document.querySelector('#copyEmail');
  const message = document.querySelector('#copyMessage');
  try {
    await navigator.clipboard.writeText(button.dataset.email);
    message.textContent = 'Email copied to your clipboard.';
  } catch {
    message.textContent = `Email: ${button.dataset.email}`;
  }
});

const companySections = [...document.querySelectorAll('.more-projects')];
const smartRunningSection = companySections.find((section) => section.textContent.includes('SmartRunning'));
const omniFreightSection = companySections.find((section) => section.textContent.includes('OmniFreight'));

if (smartRunningSection && omniFreightSection) {
  smartRunningSection.querySelector('.skills-grid').append(omniFreightSection.querySelector('.skill-card'));
  omniFreightSection.remove();
}
