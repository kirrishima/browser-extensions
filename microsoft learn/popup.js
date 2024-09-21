document.getElementById('en-us').addEventListener('click', () => {
  changeLanguage('en-us');
});

document.getElementById('ru-ru').addEventListener('click', () => {
  changeLanguage('ru-ru');
});

function changeLanguage(language) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let url = new URL(tabs[0].url);
    let pathSegments = url.pathname.split('/');
    if (pathSegments.length > 1) {
      pathSegments[1] = language;
      url.pathname = pathSegments.join('/');
      chrome.tabs.update(tabs[0].id, { url: url.toString() });
      window.close();
    }
  });
}

document.getElementById("search-button").addEventListener("click", function () {
  performSearch();
});

document.getElementById("search-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const query = document.getElementById('search-input').value;
  if (query) {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}+site:www.microsoft.com+OR+site:learn.microsoft.com`;
    chrome.tabs.create({ url: googleUrl });
  } else {
    alert("Please enter a search query");
  }
}

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchInput.addEventListener('focus', function () {
  searchButton.style.visibility = 'visible';
  searchButton.style.pointerEvents = 'auto';
});

searchInput.addEventListener('blur', function () {
  setTimeout(function () {
    searchButton.style.visibility = 'hidden';
    searchButton.style.pointerEvents = 'none';
  }, 200);
});
