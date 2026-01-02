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
        mdFile: 'dove.md',
        showMap: true
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
      path = ''; // Fallback alla home
    }

    const route = this.routes[path];
    this.currentRoute = path;

    // Estrai la classe dal nome del file MD (senza estensione)
    const pageClass = route.mdFile.replace('.md', '');

    // Aggiorna la classe del body
    this.updateBodyClass(pageClass);

    // Aggiorna il menu attivo
    this.updateActiveMenu(path);

    // Mostra/nascondi elementi specifici della pagina
    this.togglePageElements(route);

    // Aggiorna l'header
    this.updateHeader(path);

    // Carica il contenuto MD
    this.loadContent(route.mdFile);

    // Scroll to top
    window.scrollTo(0, 0);
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
    if (container) {
      container.innerHTML = '<p>Caricamento contenuto...</p>';
      
      // Usa il loader MD esistente
      if (typeof loadMDContent === 'function') {
        loadMDContent(mdFile, 'md-content');
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
