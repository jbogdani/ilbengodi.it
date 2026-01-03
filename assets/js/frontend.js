// Le configurazioni di orari e chiusure sono in assets/js/config.js
// Modifica quel file per aggiornare gli orari del ristorante

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
  
  const daysOfWeek = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  const closingDay = daysOfWeek[BUSINESS_INFO.weeklyClosingDay];
  
  marker = L.marker([43.346092, 11.5019804]).addTo(map);
  marker.bindPopup(
    `<big>Enoteca &amp; Ristorante <strong>Bengodi</strong></big>.<br />Telefono: <a href="tel:+393293134760">📞 +39 329 3134760</a><br />Orario: ${BUSINESS_INFO.openingTime} - ${BUSINESS_INFO.closingTime}, chiuso il ${closingDay}<br /><a class="btn btn-info btn-sm" href="https://www.google.it/maps/dir/Via+della+Societ%C3%A0+Operaia,+11,+53019+Castelnuovo+Berardenga+SI/@43.346083,11.5000403,17z">🚘 Avvia navigatore</a>`
  );
}

// Esponi la funzione globalmente per essere chiamata dal router
window.initMap = initMap;

// Funzione per generare l'abbreviazione dei giorni di apertura per il tag meta
function getOpeningDaysAbbr() {
  const daysAbbr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const closedDay = BUSINESS_INFO.weeklyClosingDay;
  
  // Calcola primo e ultimo giorno di apertura
  const firstOpenDay = (closedDay + 1) % 7;
  const lastOpenDay = (closedDay - 1 + 7) % 7;
  
  return `${daysAbbr[firstOpenDay]}-${daysAbbr[lastOpenDay]}`;
}

// Funzione per aggiornare il footer con gli orari
function updateFooter() {
  const footerSchedule = document.querySelector('footer .col-sm:last-child');
  if (footerSchedule) {
    const daysOfWeek = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
    const closingDay = daysOfWeek[BUSINESS_INFO.weeklyClosingDay];
    const openingDaysAbbr = getOpeningDaysAbbr();
    
    footerSchedule.innerHTML = `
      <i class="fa fa-clock-o fa-3x" aria-hidden="true"></i><br>
      <meta itemprop="openingHours" content="${openingDaysAbbr} ${BUSINESS_INFO.openingTime}-${BUSINESS_INFO.closingTime}" />
      Aperto: ${BUSINESS_INFO.openingTime} - ${BUSINESS_INFO.closingTime} <br> Giorno di chiusura: ${closingDay}
    `;
  }
}

// Aggiorna il footer quando il DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateFooter);
} else {
  updateFooter();
}
