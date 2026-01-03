// Gestione galleria immagini con GLightbox

let lightbox = null;

function initGallery() {
  if (lightbox) {
    lightbox.reload();
  } else {
    lightbox = GLightbox({
      selector: '.glightbox'
    });
  }
}

// Inizializza GLightbox quando il DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallery);
} else {
  initGallery();
}
