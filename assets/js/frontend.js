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
  const fullAddress = `${BUSINESS_INFO.address.street}, ${BUSINESS_INFO.address.postalCode} ${BUSINESS_INFO.address.city} ${BUSINESS_INFO.address.province}`;
  const googleMapsUrl = `https://www.google.it/maps/dir//${encodeURIComponent(fullAddress)}`;
  
  marker = L.marker([43.346092, 11.5019804]).addTo(map);
  marker.bindPopup(
    `<big>Enoteca &amp; Ristorante <strong>Bengodi</strong></big>.<br />Telefono: <a href="tel:${BUSINESS_INFO.phone}">📞 ${BUSINESS_INFO.phone.replace(/^\+39/, '+39 ')}</a><br />Orario: ${BUSINESS_INFO.openingTime} - ${BUSINESS_INFO.closingTime}, chiuso il ${closingDay}<br /><a class="btn btn-info btn-sm" href="${googleMapsUrl}">🚘 Avvia navigatore</a>`
  );
}

// Esponi la funzione globalmente per essere chiamata dal router
window.initMap = initMap;

// Funzione per aggiornare i contatti nella pagina "dove"
function updateDoveContacts() {
  const phoneFormatted = BUSINESS_INFO.phone.replace(/^\+39/, '+39 ');
  const daysOfWeek = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  const closingDay = daysOfWeek[BUSINESS_INFO.weeklyClosingDay];
  
  // Aggiorna indirizzo
  const doveAddress = document.getElementById('dove-address');
  if (doveAddress) {
    doveAddress.textContent = `${BUSINESS_INFO.address.street}. ${BUSINESS_INFO.address.postalCode} ${BUSINESS_INFO.address.city}`;
  }
  
  // Genera link Google Maps
  const doveGoogleMaps = document.getElementById('dove-google-maps');
  if (doveGoogleMaps) {
    const fullAddress = `${BUSINESS_INFO.address.street}, ${BUSINESS_INFO.address.postalCode} ${BUSINESS_INFO.address.city} ${BUSINESS_INFO.address.province}`;
    doveGoogleMaps.href = `https://www.google.it/maps/dir//${encodeURIComponent(fullAddress)}`;
  }
  
  // Genera link Apple Maps
  const doveAppleMaps = document.getElementById('dove-apple-maps');
  if (doveAppleMaps) {
    const fullAddress = `${BUSINESS_INFO.address.street} ${BUSINESS_INFO.address.postalCode} ${BUSINESS_INFO.address.city} ${BUSINESS_INFO.address.province} ${BUSINESS_INFO.address.country}`;
    doveAppleMaps.href = `https://maps.apple.com/directions?destination=${encodeURIComponent(fullAddress)}&mode=driving`;
  }
  
  const doveWhatsapp = document.getElementById('dove-whatsapp');
  if (doveWhatsapp) {
    doveWhatsapp.innerHTML = `💬 WhatsApp: <a href="https://wa.me/${BUSINESS_INFO.whatsapp}">${phoneFormatted}</a>`;
  }
  
  const dovePhone = document.getElementById('dove-phone');
  if (dovePhone) {
    dovePhone.innerHTML = `📞 Telefono: <a href="tel:${BUSINESS_INFO.phone}">${phoneFormatted}</a>`;
  }
  
  const doveSchedule = document.getElementById('dove-schedule');
  if (doveSchedule) {
    doveSchedule.innerHTML = `🕣 Orario: <strong>${BUSINESS_INFO.openingTime} - ${BUSINESS_INFO.closingTime}</strong><br>🔒 Giorno di chiusura: <strong>${closingDay.charAt(0).toUpperCase() + closingDay.slice(1)}</strong>`;
  }
}

// Aggiorna i contatti quando il DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateDoveContacts);
} else {
  updateDoveContacts();
}

// Funzione per generare l'abbreviazione dei giorni di apertura per il tag meta
function getOpeningDaysAbbr() {
  const daysAbbr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const closedDay = BUSINESS_INFO.weeklyClosingDay;
  
  // Calcola primo e ultimo giorno di apertura
  const firstOpenDay = (closedDay + 1) % 7;
  const lastOpenDay = (closedDay - 1 + 7) % 7;
  
  return `${daysAbbr[firstOpenDay]}-${daysAbbr[lastOpenDay]}`;
}

// Funzione per aggiornare il footer con gli orari e contatti
function updateFooter() {
  // Aggiorna indirizzo
  const footerAddress = document.getElementById('footer-address');
  if (footerAddress) {
    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS_INFO.address.street + ' ' + BUSINESS_INFO.address.postalCode + ' ' + BUSINESS_INFO.address.city)}`;
    const link = footerAddress.querySelector('a');
    if (link) {
      link.href = googleMapsUrl;
      link.querySelector('[itemprop="streetAddress"]').textContent = BUSINESS_INFO.address.street;
      link.querySelector('[itemprop="postalCode"]').textContent = BUSINESS_INFO.address.postalCode;
      link.querySelector('[itemprop="addressLocality"]').textContent = BUSINESS_INFO.address.city;
    }
  }
  
  // Aggiorna orari
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
  
  // Aggiorna numeri di telefono
  const phoneFormatted = BUSINESS_INFO.phone.replace(/^\+39/, '+39 ');
  
  const footerPhone = document.getElementById('footer-phone');
  if (footerPhone) {
    footerPhone.href = `tel:${BUSINESS_INFO.phone}`;
    footerPhone.setAttribute('aria-label', `Chiamaci al ${phoneFormatted}`);
    footerPhone.querySelector('span').textContent = phoneFormatted;
  }
  
  const footerWhatsapp = document.getElementById('footer-whatsapp');
  if (footerWhatsapp) {
    footerWhatsapp.href = `https://wa.me/${BUSINESS_INFO.whatsapp}`;
    footerWhatsapp.querySelector('span').textContent = phoneFormatted;
  }
}

// Aggiorna il footer quando il DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateFooter);
} else {
  updateFooter();
}
