// Navbar Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#navbar ul li a');

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
});
