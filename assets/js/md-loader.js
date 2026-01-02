/**
 * MD Content Loader
 * Carica e visualizza contenuti dai file Markdown
 */

class MDLoader {
  constructor() {
    this.marked = null;
    this.loadMarkedLibrary();
  }

  /**
   * Carica la libreria marked.js per parsing markdown
   */
  loadMarkedLibrary() {
    if (typeof marked !== 'undefined') {
      this.marked = marked;
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    script.onload = () => {
      this.marked = marked;
      this.processContent();
    };
    document.head.appendChild(script);
  }

  /**
   * Carica il contenuto MD dal file specificato
   * @param {string} mdFile - Path al file MD
   * @param {string} containerId - ID del container dove inserire il contenuto
   * @returns {Promise} Promise che si risolve quando il contenuto è caricato
   */
  async loadContent(mdFile, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error(`Container ${containerId} non trovato`);
      return Promise.reject(new Error(`Container ${containerId} non trovato`));
    }

    try {
      const response = await fetch(mdFile);
      
      if (!response.ok) {
        throw new Error(`Errore nel caricamento: ${response.status}`);
      }

      const mdContent = await response.text();
      
      // Attendi che marked sia caricato
      await this.waitForMarked();
      
      // Estrai frontmatter e contenuto
      const { frontmatter, content } = this.parseFrontmatter(mdContent);
      
      // Converti markdown in HTML
      const htmlContent = marked.parse(content);
      
      // Inserisci il contenuto nel container
      container.innerHTML = htmlContent;
      
      // Aggiorna i metadati della pagina se presenti nel frontmatter
      this.updatePageMetadata(frontmatter);
      
      return Promise.resolve();
      
    } catch (error) {
      console.error('Errore nel caricamento del contenuto MD:', error);
      container.innerHTML = '<p>Errore nel caricamento del contenuto.</p>';
      return Promise.reject(error);
    }
  }

  /**
   * Attende che la libreria marked sia caricata
   */
  async waitForMarked() {
    let attempts = 0;
    while (!this.marked && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (typeof marked !== 'undefined') {
        this.marked = marked;
      }
      attempts++;
    }
    if (!this.marked) {
      throw new Error('Impossibile caricare la libreria marked');
    }
  }

  /**
   * Estrae frontmatter YAML dal contenuto markdown
   * @param {string} mdContent - Contenuto markdown completo
   * @returns {Object} Oggetto con frontmatter e content separati
   */
  parseFrontmatter(mdContent) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = mdContent.match(frontmatterRegex);

    if (match) {
      const frontmatterText = match[1];
      const content = match[2];
      
      // Parse semplice del YAML frontmatter
      const frontmatter = {};
      frontmatterText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();
          frontmatter[key] = value;
        }
      });

      return { frontmatter, content };
    }

    return { frontmatter: {}, content: mdContent };
  }

  /**
   * Aggiorna i metadati della pagina dal frontmatter
   * @param {Object} frontmatter - Oggetto frontmatter
   */
  updatePageMetadata(frontmatter) {
    if (frontmatter.title) {
      document.title = frontmatter.title;
      
      // Aggiorna anche il titolo visibile nella pagina
      const pageTitle = document.getElementById('page-title');
      if (pageTitle && frontmatter.title) {
        // Per la home, mantieni lo stile speciale con B arancione
        if (frontmatter.title.includes('Ristorante enoteca Bengodi')) {
          pageTitle.innerHTML = 'Enoteca <span class="orange">B</span>engodi';
        } else {
          // Per le altre pagine, usa il primo H1 dal contenuto o il title
          pageTitle.textContent = frontmatter.title.split(' - ')[0];
        }
      }
    }

    if (frontmatter.description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', frontmatter.description);
      }
    }
  }

  /**
   * Processa il contenuto se marked è già caricato
   */
  processContent() {
    const event = new CustomEvent('markedLoaded');
    document.dispatchEvent(event);
  }
}

// Inizializza il loader globale
const mdLoader = new MDLoader();

/**
 * Funzione helper per caricare contenuti MD
 * @param {string} mdFile - Path al file MD
 * @param {string} containerId - ID del container
 * @returns {Promise} Promise che si risolve quando il contenuto è caricato
 */
function loadMDContent(mdFile, containerId) {
  return mdLoader.loadContent(mdFile, containerId);
}
