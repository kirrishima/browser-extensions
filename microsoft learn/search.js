export function performSearch(query) {
    if (query) {
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}+site:www.microsoft.com+OR+site:learn.microsoft.com`;
        chrome.tabs.create({ url: googleUrl });
    } else {
        alert("Please enter a search query");
    }
}