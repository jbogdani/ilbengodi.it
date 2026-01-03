/**
 * CONFIGURAZIONE ORARI E CHIUSURE DEL RISTORANTE
 * 
 * Modifica questo file per aggiornare gli orari di apertura,
 * il giorno di chiusura settimanale e i periodi di ferie.
 * Le modifiche si applicheranno automaticamente in tutto il sito.
 */

const BUSINESS_INFO = {
  /**
   * Indirizzo completo del ristorante
   */
  address: {
    street: 'Via della Società Operaia 11',
    postalCode: '53019',
    city: 'Castelnuovo Berardenga',
    province: 'SI',
    country: 'Italia'
  },

  /**
   * Numero di telefono
   * Formato: con prefisso internazionale senza spazi
   */
  phone: '+393293134760',

  /**
   * Numero WhatsApp (di solito uguale al telefono)
   * Formato: solo cifre, con prefisso internazionale
   */
  whatsapp: '393293134760',

  /**
   * Orario di apertura (formato 24h: HH:MM)
   * Esempio: '11:00', '12:30', '18:00'
   */
  openingTime: '11:00',

  /**
   * Orario di chiusura (formato 24h: HH:MM)
   * Esempio: '23:00', '23:30', '22:00'
   */
  closingTime: '23:00',

  /**
   * Giorno di chiusura settimanale
   * 0 = Domenica
   * 1 = Lunedì (attuale)
   * 2 = Martedì
   * 3 = Mercoledì
   * 4 = Giovedì
   * 5 = Venerdì
   * 6 = Sabato
   */
  weeklyClosingDay: 1,

  /**
   * Periodi di ferie/chiusura straordinaria
   * Formato: ['YYYY-MM-DD', 'YYYY-MM-DD'] (data inizio, data fine)
   * 
   * Esempi di configurazione:
   */
  holidays: [
    ['2026-01-12', '2026-02-12'],     // Chiusura gennaio 2026
    // ['2026-08-01', '2026-08-15'],     // Ferie estive agosto 2026
    // ['2026-12-24', '2027-01-06'],     // Ferie natalizie 2026/2027
    // ['2027-02-15', '2027-02-28'],     // Chiusura febbraio 2027
  ]
};
