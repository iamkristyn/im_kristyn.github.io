document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const body = document.body;
  const themeToggles = document.querySelectorAll('.theme-toggle');

  function applyTheme(theme) {
    body.classList.remove('theme-light', 'theme-dark');
    body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
    themeToggles.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    try {
      localStorage.setItem('kh_theme', theme);
    } catch (e) {}
  }

  let storedTheme = null;
  try {
    storedTheme = localStorage.getItem('kh_theme');
  } catch (e) {}
  applyTheme(storedTheme === 'dark' ? 'dark' : 'light');

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.theme === 'dark' ? 'dark' : 'light');
    });
  });

  // View toggle (grid / list) and filters on index
  const gridView = document.getElementById('gridView');
  const listView = document.getElementById('listView');
  const viewButtons = document.querySelectorAll('.view-toggle');
  const filterButtons = document.querySelectorAll('.filter-toggle');

  function setView(view) {
    if (!gridView || !listView) return;
    if (view === 'list') {
      gridView.classList.add('hidden');
      listView.classList.remove('hidden');
    } else {
      gridView.classList.remove('hidden');
      listView.classList.add('hidden');
    }
    viewButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
  }

  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => setView(btn.dataset.view));
  });

  function applyFilter(filter) {
    const gridCards = document.querySelectorAll('.project-card');
    const listRows = document.querySelectorAll('.project-list-row');

    gridCards.forEach(card => {
      const type = card.dataset.type;
      card.style.display = (filter === 'all' || filter === type) ? '' : 'none';
    });

    listRows.forEach(row => {
      const type = row.dataset.type;
      row.style.display = (filter === 'all' || filter === type) ? '' : 'none';
    });

    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  // default state
  applyFilter('all');
  setView('grid');

  // List view preview + click through
  const previewImg = document.getElementById('listPreviewImage');
  const rows = document.querySelectorAll('.project-list-row');

  rows.forEach(row => {
    function activateRow() {
      rows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');
      const src = row.dataset.preview;
      if (previewImg && src) previewImg.src = src;
    }

    row.addEventListener('mouseenter', activateRow);
    row.addEventListener('focus', activateRow);

    row.addEventListener('click', () => {
      const link = row.dataset.link;
      if (link) window.location.href = link;
    });
  });
});
