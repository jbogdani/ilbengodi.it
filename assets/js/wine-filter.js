/**
 * Wine Filter - Filtra la carta dei vini per produttore o singolo vino
 */

function initWineFilter() {
  const searchInput = document.getElementById('search_wine');
  if (!searchInput) return;

  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const mdContent = document.getElementById('md-content');
    
    if (!mdContent) return;

    // Se la ricerca è vuota, mostra tutto
    if (!searchTerm) {
      showAllWines(mdContent);
      return;
    }

    // Nascondi tutto inizialmente
    hideAllWines(mdContent);

    // Cerca nei produttori (h3)
    const producers = mdContent.querySelectorAll('h3');
    producers.forEach(producer => {
      const producerName = producer.textContent.toLowerCase();
      
      // Se il produttore corrisponde, mostra lui e la lista che segue
      if (producerName.includes(searchTerm)) {
        producer.style.display = 'block';
        // Mostra la ul che segue e tutti i suoi li
        let nextElement = producer.nextElementSibling;
        while (nextElement && nextElement.tagName === 'UL') {
          nextElement.style.display = 'block';
          // Mostra tutti i li dentro questa ul
          const items = nextElement.querySelectorAll('li');
          items.forEach(item => item.style.display = 'list-item');
          nextElement = nextElement.nextElementSibling;
        }
      }
    });

    // Cerca nei singoli vini (li)
    const wineItems = mdContent.querySelectorAll('ul li');
    wineItems.forEach(item => {
      const wineName = item.textContent.toLowerCase();
      
      if (wineName.includes(searchTerm)) {
        item.style.display = 'list-item';
        // Mostra anche la ul parent
        const parentUl = item.closest('ul');
        if (parentUl) {
          parentUl.style.display = 'block';
          // Mostra anche l'h3 che precede questa ul
          let prevElement = parentUl.previousElementSibling;
          while (prevElement && prevElement.tagName !== 'H3') {
            prevElement = prevElement.previousElementSibling;
          }
          if (prevElement && prevElement.tagName === 'H3') {
            prevElement.style.display = 'block';
          }
        }
      }
    });
  });
}

function hideAllWines(container) {
  // Nascondi tutti i produttori (h3) e le liste (ul)
  const producers = container.querySelectorAll('h3');
  producers.forEach(el => el.style.display = 'none');
  
  const lists = container.querySelectorAll('ul');
  lists.forEach(el => el.style.display = 'none');
  
  const items = container.querySelectorAll('ul li');
  items.forEach(el => el.style.display = 'none');
}

function showAllWines(container) {
  // Mostra tutti i produttori (h3) e le liste (ul)
  const producers = container.querySelectorAll('h3');
  producers.forEach(el => el.style.display = 'block');
  
  const lists = container.querySelectorAll('ul');
  lists.forEach(el => el.style.display = 'block');
  
  const items = container.querySelectorAll('ul li');
  items.forEach(el => el.style.display = 'list-item');
}

// Inizializza quando il DOM è pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWineFilter);
} else {
  initWineFilter();
}
