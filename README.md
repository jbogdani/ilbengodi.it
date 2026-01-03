# Il Bengodi - Enoteca & Ristorante

🍷 Sito web per **Il Bengodi**, enoteca e ristorante a Castelnuovo Berardenga (Siena).

## 🌐 Sito Live

- **URL:** https://ilbengodi.it
- **GitHub Pages:** https://USERNAME.github.io/ilbengodi.it

## 📱 Architettura

Single Page Application (SPA) con:
- ✅ Hash routing (`/#/pagina`)
- ✅ Contenuti in Markdown
- ✅ Caricamento dinamico
- ✅ Ottimizzato per GitHub Pages

## 🗺️ Pagine

- `/#/` - Home
- `/#/dove` - Dove siamo
- `/#/prenota` - Prenota un tavolo
- `/#/specialita` - Le nostre specialità
- `/#/vini` - Carta dei vini

## 🚀 Sviluppo Locale

```bash
# Clone repository
git clone https://github.com/USERNAME/ilbengodi.it.git
cd ilbengodi.it

# Avvia server locale
python3 -m http.server 8000

# Apri browser
open http://localhost:8000
```

## 📝 Modificare i Contenuti

I contenuti sono in formato Markdown nella directory root:

```bash
# Modifica contenuti
nano index.md         # Home
nano dove.md          # Dove siamo
nano prenota.md       # Prenota
nano specialita.md    # Specialità
nano vini.md          # Vini

# Commit e push
git add *.md
git commit -m "Aggiorna contenuti"
git push

# GitHub Pages si aggiorna automaticamente!
```

## 📁 Struttura

```
.
├── index.html              # SPA principale
├── *.md                    # Contenuti (5 file)
├── CNAME                   # Dominio custom
├── sites/default/
│   ├── js/
│   │   ├── router.js       # Router SPA
│   │   └── md-loader.js    # Loader Markdown
│   ├── css/
│   │   ├── styles.css      # Stili principali
│   │   └── md-content.css  # Stili contenuti MD
│   └── images/             # Immagini e assets
└── docs/                   # Documentazione
    ├── README-MD-SYSTEM.md
    ├── MIGRATION-GUIDE.md
    └── IMPLEMENTAZIONE-COMPLETATA.md
```

## 🛠️ Tecnologie

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Markdown Parser:** [marked.js](https://marked.js.org/)
- **CSS Framework:** Bootstrap 3
- **Icons:** Font Awesome 4
- **Hosting:** GitHub Pages
- **CDN:** GitHub + Cloudflare

## 🔧 Configurazione GitHub Pages

1. Repository → **Settings**
2. Pages → **Source**: main branch
3. Custom domain → `ilbengodi.it` (opzionale)
4. Enforce HTTPS → ✅

## 📊 SEO

- ✅ Meta tags ottimizzati
- ✅ Open Graph tags
- ✅ Schema.org markup (Restaurant)
- ✅ Sitemap XML
- ✅ robots.txt

## 📞 Contatti

**Il Bengodi**  
Via della Società Operaia 11  
53019 Castelnuovo Berardenga (SI)

📧 info@ilbengodi.it  
📱 +39 329 3134760  
🕒 10:00-23:00 (Chiuso lunedì)

## 📄 Licenza

© 2022-2026 Numeroprimo srl  
P.IVA: 01424600524

---

⭐ **Nota:** Questo è un sito reale per un ristorante. Per domande tecniche, consulta la [documentazione](README-MD-SYSTEM.md).
