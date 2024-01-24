// Урок 3. Сетевые запросы
// Цель: Разработать веб-приложение, которое будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.
// Регистрация на Unsplash:
// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).
// Создание приложения:
// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.
// Разработка веб-приложения:
// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу.
// Дополнительные задачи (по желанию):
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался.
// • Реализуйте возможность просмотра предыдущих "фото дня" с сохранением их в истории просмотров.

const containerElement = document.querySelector(".container");
const photoContainerElement = document.querySelector(".photoСontainer");
const page = Math.round(Math.random() * 999);
const quantity = 1;
const url = `https://api.unsplash.com/photos?page=${page}&per_page=${quantity}&client_id=lfR60pruoyZ0dtELOQDhniia49JSOVJ5CGI_RMeGxP8`;

// массив просмотренных объектов(id, url, author, likeCounter)
let history = [];
// локальное хранилище
const localStorageKey = "browsingHistory";

// создаем событие по загрузке,   страница - рандом, количество фотографий - 1
window.addEventListener("load", function (e) {
  getImages(url);
});

// асинхронная функция получения картинок с сервера
async function getImages(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка в получении данных! Статус ${response.status}`);
    }

    // получаем массив объектов из джейсона
    const fact = await response.json();
    console.log(fact);

    // проверка на входящую пустоту(иногда приходит пустой массив);
    if (fact.length === 0) {
      // снова запускаем рандом и берем другой адрес
      const page = Math.round(Math.random() * 999);
      const url = `https://api.unsplash.com/photos?page=${page}&per_page=${quantity}&client_id=lfR60pruoyZ0dtELOQDhniia49JSOVJ5CGI_RMeGxP8`;
      getImages(url); // рекурсивный запуск, до тех пор пока не получим данные
    } else {
      // coздаем объект чтобы запушить его в массив картинок и локальное хранилище
      for (let i = 0; i < 1; i++) {
        const picture = {
          id: fact[i].id,
          url: fact[i].urls.small,
          author: fact[i].user.name,
          likeCounter: 0,
          iconSource: "images/like_icon.svg",
        };
        // если данные уже есть в хранилище, то получим их для работы
        if (JSON.parse(localStorage.getItem(localStorageKey))) {
          history = JSON.parse(localStorage.getItem(localStorageKey));
        }
        history.push(picture);

        // перезапись хранилища по ключу
        localStorage.setItem(localStorageKey, JSON.stringify(history));

        // работаем с полученной картинкой fact[i] и отображаем в html
        photoContainerElement.insertAdjacentHTML(
          "beforeend",
          `<img src="${fact[i].urls.small}" alt="image"><h1 class="author">Author: ${fact[i].user.name}</h1><div class="like">Лайков: ${picture.likeCounter}</div><h6>Кликните по фото, если хотите поставить или убрать лайк.</h6>`
        );
        photoContainerElement.insertAdjacentHTML(
          "afterend",
          `<img src="${picture.iconSource}" alt="icon" class="icon">`
        );

        likeMaker(picture);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

// функция контроля лайков и цвета лайка
function likeMaker(picture) {
  // срабатывала раньше асинхронки, пришлось сюда писать и вызывать внутри асинхронки
  const imgElement = document.querySelector("img");
  const likeCounterElement = document.querySelector(".like");
  const iconElement = document.querySelector(".icon");

  imgElement.addEventListener("click", function () {
    if (picture.likeCounter === 0) {
      //изменим данные по объекту pickture(счетчик и иконку лайка)
      picture.likeCounter++;
      picture.iconSource = "images/like_icon_fill.svg";
      likeCounterElement.innerHTML = `Лайков: ${picture.likeCounter}`;
      iconElement.setAttribute("src", picture.iconSource);
    } else {
      //изменим данные по объекту pickture(счетчик и иконку лайка)
      picture.likeCounter--;
      picture.iconSource = "images/like_icon.svg";
      likeCounterElement.innerHTML = `Лайков: ${picture.likeCounter}`;
      iconElement.setAttribute("src", picture.iconSource);
    }
    // обновим хранилище по ключу
    localStorage.setItem(localStorageKey, JSON.stringify(history));
  });
}

// блок просмотра истории
const historyElement = document.createElement("div");
const historyTitle = document.createElement('h4');
const contentHistory = document.createElement('div');
contentHistory.classList.add('contentHistory');
historyTitle.textContent = "Показать историю просмотров"
historyElement.classList.add("historyBox");
containerElement.insertAdjacentElement("afterend", historyElement);
historyElement.insertAdjacentElement('afterbegin', historyTitle);
historyElement.insertAdjacentElement('beforeend', contentHistory )

historyElement.addEventListener("click", function (e) {
  // если данные уже есть в хранилище, то получим их для работы
  const history = JSON.parse(localStorage.getItem(localStorageKey));
  if (!history) {
    alert("История пока недоступна");
  } else {
    // обнуляем историю в html коде
    contentHistory.innerHTML = '';

    history.forEach((element) => {
      
      contentHistory.insertAdjacentHTML(
        "beforeend",
        `<div class='imageHistory'><img src="${element.url}" alt="image"><h1 class="author">Author: ${element.author}</h1><div class="like">Лайков: ${element.likeCounter}</div><img src="${element.iconSource}" alt="icon" class="icon"></div>`
      );

    });
  }
});
