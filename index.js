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

const travelNestCard = [...document.querySelectorAll('.skill-card')]
  .find((card) => card.querySelector('h3')?.textContent === 'TravelNest');

if (travelNestCard) {
  const preview = document.createElement('img');
  preview.src = 'assets/travelnest-preview.png';
  preview.alt = 'TravelNest travel-planning app homepage';
  preview.loading = 'eager';
  preview.style.cssText = 'width:100%;aspect-ratio:16/9;object-fit:cover;object-position:center;border:1px solid rgba(21,41,35,.16);margin-bottom:1.5rem;display:block;';
  travelNestCard.prepend(preview);
}

const lightForCommunityCard = [...document.querySelectorAll('.feature-project')]
  .find((card) => card.querySelector('h3')?.textContent === 'Light for Community');

if (lightForCommunityCard) {
  const projectArt = lightForCommunityCard.querySelector('.community-art');
  const preview = document.createElement('img');
  preview.src = 'assets/light-for-community-preview.png';
  preview.alt = 'Light for Community website homepage';
  preview.loading = 'eager';
  preview.style.cssText = 'width:100%;height:100%;object-fit:contain;object-position:center;display:block;background:#f7f3ea;padding:1rem;';
  projectArt.replaceChildren(preview);
}

const meetAndReadCard = [...document.querySelectorAll('.feature-project')]
  .find((card) => card.querySelector('h3')?.textContent === 'MeetandReadNBO');

if (meetAndReadCard) {
  const projectArt = meetAndReadCard.querySelector('.project-art');
  const gallery = document.createElement('div');
  gallery.setAttribute('aria-label', 'Meet and Read NBO project screenshots');
  gallery.style.cssText = 'display:flex;width:100%;height:100%;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;background:#f7eff0;scrollbar-width:thin;';

  [
    ['assets/meet-and-read-nbo-preview.png', 'Meet and Read NBO book-club information screen'],
    ['assets/meet-and-read-nbo-hero-preview.png', 'Meet and Read NBO homepage'],
  ].forEach(([src, alt]) => {
    const preview = document.createElement('img');
    preview.src = src;
    preview.alt = alt;
    preview.loading = 'eager';
    preview.style.cssText = 'flex:0 0 100%;width:100%;height:100%;object-fit:contain;scroll-snap-align:start;padding:1rem;display:block;';
    gallery.append(preview);
  });

  const makeButton = (label, direction) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', label);
    button.textContent = direction;
    button.style.cssText = `position:absolute;top:50%;${direction === '‹' ? 'left:1rem' : 'right:1rem'};transform:translateY(-50%);width:2.4rem;height:2.4rem;border:0;border-radius:50%;background:rgba(21,41,35,.82);color:#fff;font-size:1.5rem;cursor:pointer;z-index:2;`;
    button.addEventListener('click', () => gallery.scrollBy({ left: direction === '‹' ? -gallery.clientWidth : gallery.clientWidth, behavior: 'smooth' }));
    return button;
  };

  const hint = document.createElement('span');
  hint.textContent = 'Swipe to view screens';
  hint.style.cssText = 'position:absolute;right:1rem;bottom:1rem;background:rgba(21,41,35,.82);color:#fff;padding:.35rem .6rem;font:500 .62rem DM Mono,monospace;letter-spacing:.04em;z-index:2;';
  projectArt.replaceChildren(gallery, makeButton('Previous screenshot', '‹'), makeButton('Next screenshot', '›'), hint);
}
