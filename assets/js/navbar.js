// Gestione menu navbar mobile

function toggleNavbar() {
  const navbar = document.getElementById('navbar');
  const button = document.querySelector('.navbar-toggler');
  const isExpanded = navbar.classList.contains('show');
  navbar.classList.toggle('show');
  button.setAttribute('aria-expanded', !isExpanded);
}

// Chiude il menu quando si clicca su un link
document.addEventListener('DOMContentLoaded', function () {
  const menuLinks = document.querySelectorAll('.navbar .nav-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      const navbar = document.getElementById('navbar');
      if (navbar.classList.contains('show')) {
        toggleNavbar();
      }
    });
  });
});
