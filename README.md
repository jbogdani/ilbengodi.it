# Il Bengodi - Enoteca & Ristorante

🍷 Guida per aggiornare i contenuti del sito web **Il Bengodi**

## 📱 Sito Web

- **Indirizzo:** https://ilbengodi.it

---

## 📝 Come Modificare i Contenuti

### 🔧 Dati del Ristorante (Orari, Telefono, Indirizzo)

**File da modificare:** [`assets/js/config.js`](https://github.com/jbogdani/ilbengodi.it/edit/main/assets/js/config.js)

Questo file contiene tutti i dati principali del ristorante che appaiono automaticamente in tutto il sito:

- **Indirizzo completo** (via, CAP, città)
- **Numeri di telefono** (fisso e WhatsApp)
- **Orari di apertura** (orario inizio e fine)
- **Giorno di chiusura settimanale** (0=Domenica, 1=Lunedì, ecc.)
- **Periodi di ferie** (date di chiusura straordinaria)

**⚠️ ATTENZIONE:**
- Modifica solo i valori tra le virgolette (es. `'11:00'` → `'12:00'`)
- **NON modificare** i nomi delle proprietà (street, phone, openingTime, ecc.)
- Per le ferie, togli il `//` davanti alla riga per attivarla
- Formato date ferie: `'AAAA-MM-GG'` (es. `'2026-08-01'`)

**Esempio di modifica orari:**
```javascript
openingTime: '11:00',  // Cambia qui l'orario di apertura
closingTime: '23:00',  // Cambia qui l'orario di chiusura
```

---

### 📄 Pagine del Sito

I contenuti delle pagine sono scritti in formato **Markdown** (un modo semplice di scrivere testi formattati).

**📚 Cos'è Markdown?**
- [Guida Markdown in italiano](https://www.markdownguide.org/basic-syntax/)
- [Tutorial Markdown (5 minuti)](https://www.markdowntutorial.com/it/)

#### 🏠 Home Page
**File:** [`index.md`](https://github.com/jbogdani/ilbengodi.it/edit/main/index.md)

Contiene il testo principale della home page.

#### 🍽️ Le Nostre Specialità
**File:** [`specialita.md`](https://github.com/jbogdani/ilbengodi.it/edit/main/specialita.md)

Descrizione dei piatti e specialità del ristorante.

#### 🍷 Carta dei Vini
**File:** [`vini.md`](https://github.com/jbogdani/ilbengodi.it/edit/main/vini.md)

Elenco vini disponibili.

#### 📞 Prenota un Tavolo
**File:** [`prenota.md`](https://github.com/jbogdani/ilbengodi.it/edit/main/prenota.md)

Informazioni sulla prenotazione.

---

## ⚠️ IL FRONTMATTER - DA NON TOCCARE

All'inizio di ogni file `.md` troverai delle righe racchiuse tra `---`:

```markdown
---
title: Nome Pagina
description: Descrizione della pagina...
keywords: parole, chiave, separate
lang: it
---
```

**⚠️ IMPORTANTE:**
- Questa sezione è chiamata "frontmatter"
- Contiene informazioni per i motori di ricerca (Google, ecc.)
- Puoi modificare title, description e keywords
- **NON RIMUOVERE** le righe con `---`
- **NON MODIFICARE** la parola `lang: it`
- Mantieni sempre la struttura: `nome: valore`

**Cosa puoi modificare:**
- ✅ `title:` - Il titolo della pagina
- ✅ `description:` - La descrizione (breve, max 160 caratteri)
- ✅ `keywords:` - Parole chiave separate da virgole

**Cosa NON devi toccare:**
- ❌ Le righe `---`
- ❌ La parola `lang:`
- ❌ I nomi delle proprietà (title, description, ecc.)

---

## 📝 Come Scrivere in Markdown

### Testo Base
```markdown
Testo normale

**Testo in grassetto**

*Testo in corsivo*

[Testo di un link](https://ilbengodi.it)
```

### Titoli
```markdown
# Titolo Grande
## Titolo Medio
### Titolo Piccolo
```

### Liste
```markdown
- Primo elemento
- Secondo elemento
- Terzo elemento

1. Primo elemento numerato
2. Secondo elemento numerato
```

### Immagini
```markdown
![Testo alternativo](indirizzo-immagine.jpg)
```

---

## 🚀 Come Modificare i File

### Su GitHub (Consigliato)

1. **Clicca sul link** del file che vuoi modificare (vedi sopra)
2. Si apre GitHub - fai login se richiesto
3. Clicca sul **pulsante matita** ✏️ (in alto a destra)
4. **Modifica il contenuto** nel riquadro
5. Scorri in basso fino a "Commit changes"
6. Scrivi una breve descrizione della modifica (es. "Aggiornato orario")
7. Clicca **"Commit changes"**
8. **Il sito si aggiorna automaticamente** in 1-2 minuti!

### Video Tutorial GitHub
- [Come modificare un file su GitHub](https://docs.github.com/it/repositories/working-with-files/managing-files/editing-files)

---

## ✅ Checklist Prima di Modificare

Prima di salvare le modifiche, verifica:

- [ ] Ho modificato solo i contenuti, non la struttura
- [ ] Il frontmatter (tra `---`) è intatto
- [ ] Ho usato la sintassi Markdown corretta
- [ ] Per config.js: ho modificato solo i valori tra virgolette
- [ ] Ho scritto una descrizione chiara della modifica

---

## 🆘 Problemi Comuni

### Il sito non si aggiorna
- Aspetta 2-3 minuti dopo aver salvato
- Svuota la cache del browser (Ctrl+F5 o Cmd+Shift+R)
- Verifica di aver cliccato "Commit changes"

### Ho rotto qualcosa!
- Su GitHub, clicca sulla voce "History" del file
- Trova la versione precedente funzionante
- Copia il contenuto e ripristinalo

### Il testo appare strano
- Controlla di aver usato la sintassi Markdown corretta
- Verifica che non ci siano caratteri speciali non supportati
- Controlla che le virgolette siano quelle normali (`"` e `'`)

---

## 📞 Contatti Tecnici

Per problemi tecnici o assistenza contatta il webmaster.

---

## 📊 Informazioni Legali

© 2022-2026 Numeroprimo srl  
P.IVA: 01424600524  

📍 Via della Società Operaia 11 - 53019 Castelnuovo Berardenga (SI)  
📧 info@ilbengodi.it  
📱 +39 329 3134760
