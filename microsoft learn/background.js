import { performSearch } from './search.js';

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "search",
        title: "Search in microsoft.com",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "search") {
        const selectedText = info.selectionText;
        performSearch(selectedText);
    }
});
