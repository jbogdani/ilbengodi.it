// Gestione form prenotazione WhatsApp

function prenotaWhatsApp() {
  const nome = document.querySelector('[name="nome"]').value;
  const telefono = document.querySelector('[name="telefono"]').value;
  const posti = document.querySelector('[name="posti"]').value;
  const data = document.querySelector('[name="data"]').value;
  const note = document.querySelector('[name="note"]').value;

  if (!nome || !telefono || !posti || !data) {
    alert("Compila tutti i campi obbligatori");
    return;
  }

  const numeroWhatsApp = BUSINESS_INFO.whatsapp;
  const messaggio = `Prenotazione tavolo\n\nNome: ${nome}\nTelefono: ${telefono}\nPersone: ${posti}\nData e ora: ${data}\nNote: ${note || "-"}`;
  const url = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(messaggio);
  window.open(url, "_blank");
}
