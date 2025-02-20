/**
 * Функция увеличения изображения с анимацией и затемнённым фоном.
 * @param {HTMLElement} img - миниатюра изображения, по которой произошёл клик.
 */
function enlargeImage(img) {
  const rect = img.getBoundingClientRect();

  // Создаем overlay с затемнённым фоном
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  // Создаем клон изображения для анимации увеличения
  const clone = img.cloneNode();
  clone.style.position = 'fixed';
  clone.style.top = rect.top + 'px';
  clone.style.left = rect.left + 'px';
  clone.style.width = rect.width + 'px';
  clone.style.height = rect.height + 'px';
  clone.style.transition = 'all 0.3s ease';
  clone.style.zIndex = '1001';

  overlay.appendChild(clone);
  document.body.appendChild(overlay);

  // Запуск анимации увеличения через requestAnimationFrame
  requestAnimationFrame(() => {
    const targetWidth = rect.width * 2;
    const targetHeight = rect.height * 2;
    const targetLeft = (window.innerWidth - targetWidth) / 2;
    const targetTop = (window.innerHeight - targetHeight) / 2;

    clone.style.top = targetTop + 'px';
    clone.style.left = targetLeft + 'px';
    clone.style.width = targetWidth + 'px';
    clone.style.height = targetHeight + 'px';
  });

  // Функция для обратной анимации и закрытия overlay
  function revert() {
    clone.style.top = rect.top + 'px';
    clone.style.left = rect.left + 'px';
    clone.style.width = rect.width + 'px';
    clone.style.height = rect.height + 'px';
    clone.addEventListener('transitionend', function handler() {
      overlay.remove();
      clone.removeEventListener('transitionend', handler);
    });
  }

  // Обработчик клика для закрытия overlay
  overlay.addEventListener('click', function() {
    revert();
  });
  clone.addEventListener('click', function(event) {
    event.stopPropagation();
    revert();
  });
}

// Назначаем обработчик клика для каждого изображения в галерее
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', function(event) {
    event.stopPropagation();
    enlargeImage(img);
  });
});

// Функциональность кнопки навигации (для мобильных устройств)
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      const navMenu = document.querySelector('.nav ul');
      if (navMenu) {
        navMenu.classList.toggle('active');
      }
    });
  }
});
