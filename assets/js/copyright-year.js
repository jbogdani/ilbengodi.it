// Aggiornamento anno copyright nel footer

document.addEventListener('DOMContentLoaded', function () {
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
