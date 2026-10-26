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

const createTags = (tags) => {
  const tagList = document.createElement('div');
  tagList.className = 'tags';
  tags.forEach((tag) => {
    const label = document.createElement('span');
    label.textContent = tag;
    tagList.append(label);
  });
  return tagList;
};

const updateProjectCard = (card, project) => {
  if (!card || !project) return;

  const copy = card.querySelector('.project-copy');
  const heading = copy.querySelector('h3');
  const description = heading.nextElementSibling;
  heading.textContent = project.title;
  description.textContent = project.description;

  const oldTags = copy.querySelector('.tags');
  oldTags.replaceWith(createTags(project.tags));

  let highlight = copy.querySelector('.project-outcome');
  if (project.highlightLabel && project.highlightText) {
    if (!highlight) {
      highlight = document.createElement('p');
      highlight.className = 'project-outcome';
      copy.querySelector('.tags').after(highlight);
    }
    const label = document.createElement('strong');
    label.textContent = `${project.highlightLabel}:`;
    highlight.replaceChildren(label, document.createTextNode(` ${project.highlightText}`));
  } else if (highlight) {
    highlight.remove();
  }

  const link = copy.querySelector('.project-link');
  link.href = project.linkUrl;
  link.firstChild.textContent = `${project.linkLabel} `;
  link.target = project.linkUrl.startsWith('http') ? '_blank' : '';
  if (link.target) link.rel = 'noreferrer';
};

fetch('content/portfolio.json')
  .then((response) => (response.ok ? response.json() : Promise.reject(response)))
  .then((content) => {
    document.querySelector('#home h1').textContent = content.hero.heading;
    document.querySelector('#home .intro').textContent = content.hero.introduction;

    const about = document.querySelector('#about .about-grid > div:last-child');
    about.replaceChildren(...content.about.map((paragraph) => {
      const item = document.createElement('p');
      item.textContent = paragraph;
      return item;
    }));

    const techStack = document.querySelector('#skills .tech-stack');
    techStack.replaceChildren(...content.techStack.map((area) => {
      const card = document.createElement('article');
      card.className = 'skill-card';
      const title = document.createElement('h3');
      title.textContent = area.title;
      const description = document.createElement('p');
      description.textContent = area.description;
      card.append(title, description);
      return card;
    }));

    document.querySelectorAll('#projects > .feature-project, #projects .project-pair > .feature-project')
      .forEach((card, index) => updateProjectCard(card, content.projects[index]));

    document.querySelectorAll('.more-projects .skill-card')
      .forEach((card, index) => {
        const project = content.currentWork[index];
        if (!project) return;
        card.querySelector('h3').textContent = project.title;
        card.querySelector('p').textContent = project.description;
        card.querySelector('.tags').replaceWith(createTags(project.tags));
        const link = card.querySelector('.text-link');
        if (project.linkUrl && link) {
          link.href = project.linkUrl;
          link.firstChild.textContent = `${project.linkLabel} `;
        } else if (link) {
          link.remove();
        }
      });
  })
  .catch(() => {
    // The page retains its built-in content if the editable file is unavailable.
  });
