let map = null;
let marker = null;
let lightbox = null;

// Inizializza GLightbox quando il DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallery);
} else {
  initGallery();
}

function initGallery() {
  if (lightbox) {
    lightbox.reload();
  } else {
    lightbox = GLightbox({
      selector: '.glightbox'
    });
  }
}

// Inizializza la mappa solo quando diventa visibile
function initMap() {
  if (map) {
    // Se la mappa esiste già, invalida le dimensioni
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return;
  }

  // Crea la mappa
  map = L.map("map").setView([43.346092, 11.5019804], 15);
  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  
  marker = L.marker([43.346092, 11.5019804]).addTo(map);
  marker.bindPopup(
    "<big>Enoteca &amp; Ristorante <strong>Bengodi</strong></big>.<br />Telefono: <a href=\"tel:+393293134760\">📞 +39 329 3134760</a><br />Orario: 11.00 - 23.30, chiuso il lunedì<br /><a class=\"btn btn-info btn-sm\" href=\"https://www.google.it/maps/dir/Via+della+Societ%C3%A0+Operaia,+11,+53019+Castelnuovo+Berardenga+SI/@43.346083,11.5000403,17z\">🚘 Avvia navigatore</a>"
  );
}

// Esponi la funzione globalmente per essere chiamata dal router
window.initMap = initMap;
