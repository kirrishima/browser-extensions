let isRunning = true;
function checkForAdblockMessage() {
  const messageElement = document.querySelectorAll("span");

  if (messageElement) {
    Array.from(messageElement).forEach((element) => {
      if (element.textContent) {
        if (element.innerText.toLowerCase().includes("Ad blockers violate YouTube's Terms of Service".toLowerCase())) {
          location.reload();
        }
      }
    });
  }
}
let intervalId;

function start() {
  checkForAdblockMessage();

  intervalId = setInterval(checkForAdblockMessage, 1000);
  isRunning = true;

  setTimeout(() => {
    clearInterval(intervalId);
    isRunning = false;
  }, 5000);
}
start();
window.navigation.addEventListener("navigate", (event) => {
  if (!isRunning) {
    start();
  }
});
