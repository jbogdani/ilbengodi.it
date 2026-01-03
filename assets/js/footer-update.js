// Aggiornamento dinamico del footer

function getOpeningDaysAbbr() {
  const daysAbbr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const closedDay = BUSINESS_INFO.weeklyClosingDay;
  
  // Calcola primo e ultimo giorno di apertura
  const firstOpenDay = (closedDay + 1) % 7;
  const lastOpenDay = (closedDay - 1 + 7) % 7;
  
  return `${daysAbbr[firstOpenDay]}-${daysAbbr[lastOpenDay]}`;
}

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
