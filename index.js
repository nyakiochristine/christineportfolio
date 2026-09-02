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

document.querySelectorAll('.slideshow').forEach((slideshow) => {
  const images = JSON.parse(slideshow.dataset.slides);
  const image = slideshow.querySelector('img');
  const count = slideshow.querySelector('.slide-count');
  let current = 0;

  const showSlide = (index) => {
    current = (index + images.length) % images.length;
    image.src = images[current];
    image.alt = `${slideshow.dataset.alt} ${current + 1}`;
    count.textContent = `${current + 1} / ${images.length}`;
  };

  slideshow.querySelector('.previous').addEventListener('click', () => showSlide(current - 1));
  slideshow.querySelector('.next').addEventListener('click', () => showSlide(current + 1));
});