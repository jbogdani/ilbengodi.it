/**
 * Router SPA per ilbengodi.it
 * Gestisce la navigazione tra le pagine tramite hash routing
 */

class Router {
  constructor() {
    this.routes = {
      '': {
        mdFile: 'index.md',
        showGallery: true,
        showTripadvisor: true
      },
      'dove': {
        // Pagina senza contenuto MD - tutto gestito dinamicamente in index.html
        showMap: true,
        skipMdLoad: true
      },
      'prenota': {
        mdFile: 'prenota.md',
        showForm: true
      },
      'specialita': {
        mdFile: 'specialita.md'
      },
      'vini': {
        mdFile: 'vini.md',
        showWineSearch: true
      }
    };

    this.currentRoute = null;
    this.init();
  }

  init() {
    // Ascolta i cambiamenti nell'hash
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
    
    // Intercetta i click sui link
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
        const link = e.target.matches('a') ? e.target : e.target.closest('a');
        const href = link.getAttribute('href');
        
        // Se è un link del menu, previeni il comportamento default
        if (href && href.startsWith('#/')) {
          e.preventDefault();
          window.location.hash = href;
        }
      }
    });
  }

  handleRoute() {
    // Ottieni il path dall'hash (es. #/dove → dove)
    let path = window.location.hash.slice(2); // Rimuovi "#/"
    
    // Se il path è vuoto, usa la home
    if (!path || path === '/') {
      path = '';
    }

    // Controlla se la route esiste
    if (!this.routes[path]) {
      // Route non trovata - mostra 404
      this.show404(path);
      return;
    }

    const route = this.routes[path];
    this.currentRoute = path;

    // Estrai la classe dal nome del file MD (senza estensione) o usa il path
    const pageClass = route.mdFile ? route.mdFile.replace('.md', '') : path;

    // Aggiorna la classe del body
    this.updateBodyClass(pageClass);

    // Aggiorna il menu attivo
    this.updateActiveMenu(path);

    // Mostra/nascondi elementi specifici della pagina
    this.togglePageElements(route);

    // Aggiorna l'header
    this.updateHeader(path);

    // Carica il contenuto MD (se presente)
    if (route.skipMdLoad) {
      // Non caricare MD, nascondi il contenitore principale
      const mainContent = document.getElementById('main-content');
      const spinner = document.getElementById('loading-spinner');
      if (spinner) spinner.style.display = 'none';
      if (mainContent) mainContent.style.display = 'none';
      
      // Aggiorna solo il titolo
      document.title = this.getPageTitle(path);
      const pageTitle = document.getElementById('page-title');
      if (pageTitle) {
        pageTitle.innerHTML = this.getPageHeading(path);
      }
    } else {
      // Mostra il contenitore principale
      const mainContent = document.getElementById('main-content');
      if (mainContent) mainContent.style.display = 'block';
      this.loadContent(route.mdFile);
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  show404(invalidPath) {
    // Mostra pagina 404
    const container = document.getElementById('md-content');
    const spinner = document.getElementById('loading-spinner');
    
    if (spinner) spinner.style.display = 'none';
    
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
          <h1 style="font-size: 72px; color: #cc580c; margin-bottom: 20px;">404</h1>
          <h2 style="margin-bottom: 30px;">Pagina non trovata</h2>
          <p style="margin-bottom: 30px; color: #666;">
            La pagina "${invalidPath}" che stai cercando non esiste.
          </p>
          <a href="#/" class="btn" style="display: inline-block; background: #cc580c; color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; font-weight: bold;">
            Torna alla Home
          </a>
        </div>
      `;
    }
    
    // Aggiorna title
    document.title = "404 - Pagina non trovata | Bengodi";
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
      pageTitle.textContent = "Pagina non trovata";
    }
    
    // Rimuovi classi active dal menu
    const menuItems = document.querySelectorAll('.menu.main .menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    
    // Nascondi header image
    const header = document.querySelector('header');
    if (header) header.className = '';
    
    // Nascondi tutti gli elementi specifici
    this.togglePageElements({});
  }

  updateBodyClass(className) {
    // Rimuovi tutte le classi di pagina esistenti
    document.body.classList.remove('index', 'home', 'dove', 'prenota', 'specialita', 'vini');
    
    // Aggiungi la nuova classe
    if (className) {
      document.body.classList.add(className);
      // Se è index, aggiungi anche 'home' per compatibilità CSS
      if (className === 'index') {
        document.body.classList.add('home');
      }
    }
  }

  updateActiveMenu(path) {
    const menuItems = document.querySelectorAll('.menu.main .menu-item');
    
    menuItems.forEach(item => {
      const link = item.querySelector('a');
      if (!link) return;

      const href = link.getAttribute('href');
      item.classList.remove('active');

      // Home
      if (path === '' && (href === 'index.html' || href === '#/' || href === '#')) {
        item.classList.add('active');
      }
      // Altre pagine
      else if (path && href.includes('#/' + path)) {
        item.classList.add('active');
      }
    });
  }

  updateHeader(path) {
    const header = document.querySelector('header');
    
    if (path === '') {
      header.className = 'home';
    } else {
      header.className = path;
    }
  }

  getPageTitle(path) {
    const titles = {
      '': 'Ristorante enoteca Bengodi, Castelnuovo Berardegna in Chianti',
      'dove': 'Dove siamo - Ristorante Enoteca Bengodi',
      'prenota': 'Prenota - Ristorante Enoteca Bengodi',
      'specialita': 'Le nostre specialità - Ristorante Enoteca Bengodi',
      'vini': 'Carta dei vini - Ristorante Enoteca Bengodi'
    };
    return titles[path] || 'Ristorante Enoteca Bengodi';
  }

  getPageHeading(path) {
    const headings = {
      '': 'Enoteca <span class="orange">B</span>engodi',
      'dove': '<span class="orange">D</span>ove siamo',
      'prenota': '<span class="orange">P</span>renota un tavolo',
      'specialita': 'Le nostre <span class="orange">s</span>pecialità',
      'vini': 'Carta dei <span class="orange">v</span>ini'
    };
    return headings[path] || 'Enoteca <span class="orange">B</span>engodi';
  }

  togglePageElements(route) {
    // Gallery (solo home)
    const gallerySection = document.querySelector('.home-gallery');
    if (gallerySection) {
      gallerySection.style.display = route.showGallery ? 'block' : 'none';
    }

    // Tripadvisor widgets (solo home)
    const tripadvisorWidgets = document.querySelectorAll('.home-only-widget');
    tripadvisorWidgets.forEach(widget => {
      widget.style.display = route.showTripadvisor ? 'block' : 'none';
    });

    // Mappa (solo dove)
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
      mapContainer.style.display = route.showMap ? 'block' : 'none';
      
      // Inizializza la mappa quando diventa visibile
      if (route.showMap && typeof window.initMap === 'function') {
        // Usa setTimeout per permettere al DOM di renderizzare
        setTimeout(() => window.initMap(), 100);
        
        // Aggiorna anche i contatti della pagina dove
        if (typeof window.updateDoveContacts === 'function') {
          setTimeout(() => window.updateDoveContacts(), 100);
        }
      }
    }

    // Form prenotazione (solo prenota)
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
      formContainer.style.display = route.showForm ? 'block' : 'none';
    }

    // Ricerca vini (solo vini)
    const wineSearch = document.querySelector('.search_wine_container');
    if (wineSearch) {
      wineSearch.style.display = route.showWineSearch ? 'block' : 'none';
      
      // Re-inizializza il filtro vini quando la pagina viene mostrata
      if (route.showWineSearch && typeof initWineFilter === 'function') {
        // Aspetta che il contenuto MD sia caricato
        setTimeout(() => {
          initWineFilter();
          // Resetta il campo di ricerca
          const searchInput = document.getElementById('search_wine');
          if (searchInput) {
            searchInput.value = '';
          }
        }, 100);
      }
    }
  }

  
  loadContent(mdFile) {
    const container = document.getElementById('md-content');
    const spinner = document.getElementById('loading-spinner');
    
    // Mostra spinner
    if (spinner) {
      spinner.style.display = 'flex';
      spinner.setAttribute('aria-busy', 'true');
    }
    
    if (container) {
      container.style.display = 'none';
      
      // Usa il loader MD esistente
      if (typeof loadMDContent === 'function') {
        loadMDContent(mdFile, 'md-content').then(() => {
          // Nascondi spinner quando il contenuto è caricato
          if (spinner) {
            spinner.style.display = 'none';
            spinner.setAttribute('aria-busy', 'false');
          }
          container.style.display = 'block';
        }).catch((error) => {
          console.error('Error loading content:', error);
          if (spinner) {
            spinner.style.display = 'none';
            spinner.setAttribute('aria-busy', 'false');
          }
          container.style.display = 'block';
          container.innerHTML = '<p style="color: red;">Errore nel caricamento del contenuto.</p>';
        });
      }
    }
  }

  navigate(path) {
    window.location.hash = '#/' + path;
  }
}

// Inizializza il router globale
let router;
document.addEventListener('DOMContentLoaded', function() {
  router = new Router();
});
