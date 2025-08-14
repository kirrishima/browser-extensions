let isRunning = true;

// Функция для поиска и нажатия кнопки "Пропустить рекламу"
function skipAd() {
  const skipButton = document.querySelector('.ytp-skip-ad-button');
  if (skipButton) {
    skipButton.click();
  }
}

// Функция для проверки сообщения о блокировщике
function checkForAdblockMessage() {
  const messageElements = document.querySelectorAll("span");

  if (messageElements) {
    Array.from(messageElements).forEach((element) => {
      if (element.textContent && element.innerText.toLowerCase().includes("ad blockers violate youtube's terms of service")) {
        location.reload();
      }
    });
  }
}

// Основная функция, которая запускает обе проверки
function runChecks() {
  checkForAdblockMessage();
  setTimeout(skipAd, 3000);
}

let intervalId;

function start() {
  // Запускаем проверки немедленно
  runChecks();

  // Устанавливаем интервал для периодических проверок
  intervalId = setInterval(runChecks, 1000); // Проверяем каждую секунду
  isRunning = true;

  // Ограничиваем время работы, чтобы не нагружать систему
  setTimeout(() => {
    clearInterval(intervalId);
    isRunning = false;
  }, 10000); // Увеличим время работы до 10 секунд для надежности
}

// Запускаем при первой загрузке
start();

// Перезапускаем при навигации по YouTube (переход на новое видео и т.д.)
window.navigation.addEventListener("navigate", (event) => {
  if (!isRunning) {
    start();
  }
});