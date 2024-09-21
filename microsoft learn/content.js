function collapseOL() {
  const btnText = "";
  const olElements = document.querySelectorAll("ol");
  for (let ol of olElements) {
    const liElements = ol.querySelectorAll(":scope > li");
    if (liElements.length < 9) {
      continue;
    }
    let x = 0;
    for (let li of liElements) {
      if (li.innerText.toLowerCase().includes("visual studio code") || li.innerText.toLowerCase().includes("open folder") || li.innerText.toLowerCase().includes("explorer")) {
        x++;
      }
      if (x === 3) {
        // Create a button for collapsing/expanding
        const button = document.createElement("button");
        button.innerText = "Expand";
        button.classList.add("toggle-button");
        button.addEventListener("click", function () {
          if (ol.classList.contains("collapsed")) {
            ol.classList.remove("collapsed");
            button.innerText = "Collapse" + btnText;
          } else {
            ol.classList.add("collapsed")
            button.classList.add("button");
            button.classList.add("button-filled");
            button.classList.add("button-primary");
            button.innerText = "Expand";
          }
        });

        // Insert the button before the <ol> element
        ol.insertAdjacentElement("afterend", button);

        // Initially collapse the <ol>
        ol.classList.add("collapsed")
        button.classList.add("button");
        button.classList.add("button-filled");
        button.classList.add("button-primary");
        button.innerText = "Expand" + btnText;
        return; // Collapse only the first found <ol>
      }
    }
  }
}

function setupUrlObserver() {
  let lastUrl = location.href;

  const observer = new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      // console.log("0")
      collapseOL();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}
window.addEventListener('load', () => {
  collapseOL();
  setupUrlObserver();
});
