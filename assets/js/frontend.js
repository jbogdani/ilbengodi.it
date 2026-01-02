let map = null;
let marker = null;

$(document).ready(function () {
  $("a.fancybox").fancybox();
});

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
    "<big>Enoteca &amp; Ristorante <strong>Bengodi</strong></big>.<br />Telefono: 0577 355116<br />Orario: 10.00 - 23.30<br />Chiuso il lunedì"
  );
}

// Esponi la funzione globalmente per essere chiamata dal router
window.initMap = initMap;
