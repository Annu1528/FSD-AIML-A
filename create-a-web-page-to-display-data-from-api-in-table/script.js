// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const entityFilter = document.getElementById('entityFilter');
const limitFilter = document.getElementById('limitFilter');
const sortFilter = document.getElementById('sortFilter');
const songsTable = document.getElementById('songsTable');
const loadingElement = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const resultsInfo = document.getElementById('resultsInfo');
const resultsCount = document.getElementById('resultsCount');
const searchTermDisplay = document.getElementById('searchTermDisplay');
const themeSwitch = document.getElementById('theme-switch');

// State
let currentSongs = [];
let currentSort = {
  column: 'name',
  direction: 'asc'
};

// Initialize the app
function init() {
  // Set up event listeners
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
  });
  
  // Set up sorting
  document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
      const column = th.getAttribute('data-sort');
      sortTable(column);
    });
  });
  
  // Set up theme toggle
  themeSwitch.addEventListener('change', toggleTheme);
  
  // Load initial data
  performSearch();
}

// Perform search
async function performSearch() {
  const searchTerm = searchInput.value.trim();
  const entity = entityFilter.value;
  const limit = limitFilter.value;
  
  if (!searchTerm) {
    alert('Please enter a search term');
    return;
  }
  
  // Show loading state
  showLoading();
  hideError();
  hideResultsInfo();
  
  try {
    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=${entity}&limit=${limit}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      currentSongs = data.results;
      applySorting();
      renderTable();
      showResultsInfo(searchTerm, data.results.length);
    } else {
      currentSongs = [];
      renderTable();
      showError('No results found. Try a different search term.');
    }
  } catch (error) {
    console.error("Error fetching songs:", error);
    showError('Failed to fetch music data. Please check your connection and try again.');
  } finally {
    hideLoading();
  }
}

// Render the table with songs
function renderTable() {
  const tbody = songsTable.querySelector('tbody');
  tbody.innerHTML = '';

  if (currentSongs.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="7" style="text-align: center; padding: 40px;">No songs found. Try a different search.</td>`;
    tbody.appendChild(row);
    return;
  }

  currentSongs.forEach(song => {
    const row = document.createElement('tr');
    
    // Format duration from milliseconds to minutes:seconds
    const duration = song.trackTimeMillis 
      ? `${Math.floor(song.trackTimeMillis / 60000)}:${Math.floor((song.trackTimeMillis % 60000) / 1000).toString().padStart(2, '0')}`
      : 'N/A';
    
    row.innerHTML = `
      <td>${song.trackName || 'Unknown'}</td>
      <td>${song.artistName || 'Unknown'}</td>
      <td>
        <div class="album-info">
          <img src="${song.artworkUrl100}" alt="${song.collectionName || 'Album'}" class="album-cover" />
          <span class="album-name">${song.collectionName || 'N/A'}</span>
        </div>
      </td>
      <td>${song.trackPrice ? "$" + song.trackPrice : "N/A"}</td>
      <td>${duration}</td>
      <td>${song.primaryGenreName || 'N/A'}</td>
      <td>
        ${song.previewUrl 
          ? `<audio controls class="audio-player" src="${song.previewUrl}"></audio>` 
          : '<span class="no-preview">No preview</span>'}
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Sort table by column
function sortTable(column) {
  // Update sort direction
  if (currentSort.column === column) {
    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
  } else {
    currentSort.column = column;
    currentSort.direction = 'asc';
  }
  
  // Update sort indicators
  document.querySelectorAll('th[data-sort] i').forEach(icon => {
    icon.className = 'fas fa-sort';
  });
  
  const currentTh = document.querySelector(`th[data-sort="${column}"]`);
  const icon = currentTh.querySelector('i');
  icon.className = currentSort.direction === 'asc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  
  applySorting();
  renderTable();
}

// Apply current sorting to songs
function applySorting() {
  if (!currentSort.column) return;
  
  currentSongs.sort((a, b) => {
    let aValue, bValue;
    
    switch (currentSort.column) {
      case 'name':
        aValue = a.trackName || '';
        bValue = b.trackName || '';
        break;
      case 'artist':
        aValue = a.artistName || '';
        bValue = b.artistName || '';
        break;
      case 'price':
        aValue = a.trackPrice || 0;
        bValue = b.trackPrice || 0;
        break;
      default:
        return 0;
    }
    
    // Handle string comparison
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) return currentSort.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return currentSort.direction === 'asc' ? 1 : -1;
    return 0;
  });
}

// Toggle between light and dark theme
function toggleTheme() {
  if (themeSwitch.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme preference
function checkTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    themeSwitch.checked = true;
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    themeSwitch.checked = false;
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

// UI Helper Functions
function showLoading() {
  loadingElement.classList.remove('hidden');
}

function hideLoading() {
  loadingElement.classList.add('hidden');
}

function showError(message) {
  errorMessage.querySelector('p').textContent = message;
  errorMessage.classList.remove('hidden');
}

function hideError() {
  errorMessage.classList.add('hidden');
}

function showResultsInfo(term, count) {
  searchTermDisplay.textContent = term;
  resultsCount.textContent = count;
  resultsInfo.classList.remove('hidden');
}

function hideResultsInfo() {
  resultsInfo.classList.add('hidden');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  checkTheme();
  init();
});