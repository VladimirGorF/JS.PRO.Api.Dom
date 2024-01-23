// Задача 2.

// Бесконечная лента фотографий
// Для создания бесконечной ленты с фотографиями с использованием
// Unsplash API, выполните следующие шаги:
// 1. Зарегистрируйтесь на Unsplash:
// ○ Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// ○ Нажмите кнопку "Join" или "Регистрация", чтобы создать аккаунт, если у вас его еще нет.
// ○ Войдите в свой аккаунт Unsplash.

// 2. Создайте приложение:
// ○ После входа в аккаунт Unsplash, перейдите на страницу разработчика Unsplash
// (https://unsplash.com/developers).
// ○ Нажмите на кнопку "Your apps".
// ○ Нажмите "New Application" (Новое приложение).
// ○ Заполните информацию о вашем приложении, такую как имя, описание и сайт (вы можете
// использовать http://localhost для тестового сайта).
// ○ После заполнения информации, нажмите "Create Application" (Создать приложение).

// 3. Получите API-ключ:
// ○ После создания приложения, вы получите API-ключ. Этот ключ будет
// отображаться в вашей панели управления приложением.
// ○ API-ключ представляет собой строку вида YOUR_ACCESS_KEY.
// Скопируйте его.
// 4. Измените код HTML и JavaScript:
// ○ Откройте вашу HTML-страницу в текстовом редакторе или
// интегрированной среде разработки.
// ○ Замените 'YOUR_ACCESS_KEY' в коде JavaScript на ваш собственный
// API-ключ.

// 5. Реализуйте загрузку фотографий при открытии страницы.

// 6. Реализуйте бесконечную подгрузку фотографий при прокручивании страницы.

const photoContainerElement = document.querySelector("#photo-container");
let page = 1;
let isFetching = true;

getImages(page);

window.addEventListener("scroll", function (e) {
  checkPosition();
});

async function getImages(page) {
  try {
    const url = `https://api.unsplash.com/photos?page=${page}&per_page=20&client_id=lfR60pruoyZ0dtELOQDhniia49JSOVJ5CGI_RMeGxP8`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка в получении данных! Статус ${response.status}`);
    }
    console.log(response.status);
    console.log(response.ok);
    const fact = await response.json();
    console.log(fact);
  
    // работаем с полученными данными
    fact.forEach((element) => {
      photoContainerElement.insertAdjacentHTML(
        "beforeend",
        `<img src="${element.urls.small}" alt="image">`
      );
    });
    isFetching = false; // переведем потом снова в true в момент срабатывания события прокрутки, потому что оно 12 раз при плавной прокуртуке срабатывает и чтобы в в моменте повторных вызовов данных не было.
  } catch (error) {
    console.log(error.message);
  }
}

function checkPosition() {
  // Нам потребуется знать высоту документа и высоту экрана:
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  // Они могут отличаться: если на странице много контента,
  // высота документа будет больше высоты экрана (отсюда и скролл).

  // Записываем, сколько пикселей пользователь уже проскроллил:
  const scrolled = window.scrollY;

  // Обозначим порог, по приближении к которому
  // будем вызывать какое-то действие.
  // В нашем случае — четверть экрана до конца страницы:
  const threshold = height - screenHeight / 4;

  // Отслеживаем, где находится низ экрана относительно страницы:
  const position = scrolled + screenHeight;

  if (position >= threshold && !isFetching) {
    // Если мы пересекли полосу-порог, вызываем нужное действие.
    isFetching = true;
    page++;
    getImages(page);
  }
}
