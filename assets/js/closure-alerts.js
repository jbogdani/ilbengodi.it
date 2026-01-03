// Gestione avvisi di chiusura (settimanale e ferie)

function checkClosureStatus() {
  const today = new Date();
  const currentDay = today.getDay(); // 0=Domenica, 1=Lunedì, ecc.
  const alertBox = document.getElementById('closure-alert');
  
  if (!alertBox) return;
  
  const daysOfWeek = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  
  // Verifica se oggi è il giorno di chiusura settimanale
  if (currentDay === BUSINESS_INFO.weeklyClosingDay) {
    const dayName = daysOfWeek[BUSINESS_INFO.weeklyClosingDay];
    const dayNameCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    alertBox.innerHTML = `⚠️ ${dayNameCapitalized} il Bengodi è chiuso, <a href="#/prenota" class="alert-link">prenota</a> per un altro giorno.`;
    alertBox.style.display = 'block';
    return;
  }
  
  // Verifica se oggi cade in un periodo di ferie
  const todayStr = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  
  for (const holiday of BUSINESS_INFO.holidays) {
    const [startDate, endDate] = holiday;
    
    if (todayStr >= startDate && todayStr <= endDate) {
      // Formatta le date in italiano
      const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 
                      'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
      
      const start = new Date(startDate + 'T00:00:00');
      const end = new Date(endDate + 'T00:00:00');
      
      const startFormatted = `${start.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}`;
      const endFormatted = `${end.getDate()} ${months[end.getMonth()]} ${end.getFullYear()}`;
      
      alertBox.innerHTML = `🏖️ Il Bengodi rimarrà chiuso per ferie dal ${startFormatted} al ${endFormatted}. <a href="#/prenota" class="alert-link">Prenota</a> per un giorno successivo.`;
      alertBox.style.display = 'block';
      return;
    }
  }
  
  // Nessuna chiusura - nascondi l'alert
  alertBox.style.display = 'none';
}

// Controlla lo stato di chiusura quando il DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkClosureStatus);
} else {
  checkClosureStatus();
}
