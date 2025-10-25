(function () {
  const frame = document.getElementById('pdfFrame');
  const placeholder = document.getElementById('placeholder');
  const fallback = document.getElementById('fallback');
  const dlLink = document.getElementById('dlLink');
  const list = document.getElementById('docList');
  const themeToggle = document.getElementById('themeToggle');

  function loadFromHash() {
    const url = decodeURIComponent(location.hash.slice(1));
    if (!url) return;
    // Sugerencia: ocultar toolbar del visor nativo
    const src = url + '#toolbar=0&navpanes=0&scrollbar=1';
    frame.src = src;

    // Mostrar frame y ocultar placeholder
    frame.style.display = 'block';
    placeholder.style.display = 'none';
    fallback.classList.add('hidden');

    // Simple detección de error de carga
    const timer = setTimeout(() => {
      // Si el PDF no renderiza en ~2.5s en navegadores sin visor
      // mostramos descarga.
      if (!frame.contentDocument) {
        fallback.classList.remove('hidden');
        dlLink.href = url;
      }
    }, 2500);

    // Limpieza si carga
    frame.addEventListener('load', () => clearTimeout(timer), { once: true });
  }

  window.addEventListener('hashchange', loadFromHash);
  window.addEventListener('DOMContentLoaded', loadFromHash);

  // Toggle de tema simple (invierte fondo/fg)
  themeToggle.addEventListener('click', () => {
    const dark = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() === '#0b0f14';
    if (dark) {
      document.documentElement.style.setProperty('--bg', '#f6f7f9');
      document.documentElement.style.setProperty('--bg-soft', '#ffffff');
      document.documentElement.style.setProperty('--fg', '#0a0f14');
      document.documentElement.style.setProperty('--muted', '#445566');
      document.documentElement.style.setProperty('--card', '#ffffff');
      document.documentElement.style.setProperty('--border', '#d7dde5');
    } else {
      document.documentElement.style.setProperty('--bg', '#0b0f14');
      document.documentElement.style.setProperty('--bg-soft', '#121821');
      document.documentElement.style.setProperty('--fg', '#e6edf3');
      document.documentElement.style.setProperty('--muted', '#9fb2c8');
      document.documentElement.style.setProperty('--card', '#0f141b');
      document.documentElement.style.setProperty('--border', '#233040');
    }
  });

  // Marcar activo en la lista
  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      [...list.querySelectorAll('a')].forEach(a => a.classList.remove('active'));
      e.target.classList.add('active');
    }
  });
})();
