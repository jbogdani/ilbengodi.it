// Gestione dinamica della pagina "dove"

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

// Esponi la funzione globalmente per essere chiamata dal router
window.updateDoveContacts = updateDoveContacts;
