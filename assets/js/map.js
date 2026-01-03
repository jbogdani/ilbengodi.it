// Gestione mappa Leaflet

let map = null;
let marker = null;

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
  
  const daysOfWeek = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  const closingDay = daysOfWeek[BUSINESS_INFO.weeklyClosingDay];
  const fullAddress = `${BUSINESS_INFO.address.street}, ${BUSINESS_INFO.address.postalCode} ${BUSINESS_INFO.address.city} ${BUSINESS_INFO.address.province}`;
  const googleMapsUrl = `https://www.google.it/maps/dir//${encodeURIComponent(fullAddress)}`;
  
  marker = L.marker([43.346092, 11.5019804]).addTo(map);
  marker.bindPopup(
    `<big>Enoteca &amp; Ristorante <strong>Bengodi</strong></big>.<br />Telefono: <a href="tel:${BUSINESS_INFO.phone}">📞 ${BUSINESS_INFO.phone.replace(/^\+39/, '+39 ')}</a><br />Orario: ${BUSINESS_INFO.openingTime} - ${BUSINESS_INFO.closingTime}, chiuso il ${closingDay}<br /><a class="btn btn-info btn-sm" href="${googleMapsUrl}">🚘 Avvia navigatore</a>`
  );
}

// Esponi la funzione globalmente per essere chiamata dal router
window.initMap = initMap;
