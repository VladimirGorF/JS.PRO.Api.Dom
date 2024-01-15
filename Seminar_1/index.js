
// Задание 1.
// 1. Необходимо выводить на страницу текущую ширину
// и высоту окна браузера, при изменении значений, вывод
// также должен меняться.
// 2. При закрытии страницы (вкладки), необходимо выводить
// всплывающее окно или диалоговое окно браузера и
// спросить, уверен ли пользователь, что хочет покинуть
// страницу?
// 3. Используйте объект history для управления историей
// переходов на веб-странице. Создайте кнопки "Назад" и
// "Вперед" для перемещения по истории.

// const height = window.screen.height;
// const width = window.screen.width;
// const height = window.innerHeight;
// const width = window.innerWidth;

// const heightElement = document.querySelector(".height");
// const widthElement = document.querySelector(".width");
// heightElement.textContent = document.documentElement.clientHeight;
// widthElement.textContent = document.documentElement.clientWidth;
// heightElement.textContent = window.innerHeight;
// widthElement.textContent = window.innerWidth;

// window.addEventListener("resize", function () {
//   heightElement.textContent = document.documentElement.clientHeight;
//   widthElement.textContent = document.documentElement.clientWidth;
// });

// 2. При закрытии страницы (вкладки), необходимо выводить
// всплывающее окно или диалоговое окно браузера и
// спросить, уверен ли пользователь, что хочет покинуть
// страницу?

// window.addEventListener("beforeunload", function (event) {
//   confirm("Уверен ли пользователь, что хочет покинуть страницу?");
//   event.preventDefault();

//    event.returnValue = true;
// });

// addEventListener("beforeunload", (event) => {
//     localStorage.setItem('Разлогинивание', 'Правда')
//     alert("Уверен ли пользователь, что хочет покинуть страницу?");
//     event.preventDefault();
// });

// 3. Используйте объект history для управления историей
// переходов на веб-странице. Создайте кнопки "Назад" и
// "Вперед" для перемещения по истории.

// window.history.back();  // назад
// window.history.forward();   // вперед

// Задание 2
// Даны html и css:

// Необходимо создать страницу, в которой будут работать
// все три кнопки.
// - При нажатии на кнопку "Добавить элемент" на страницу
// добавляется новый квадратный элемент (<div>) с размерами
// 100x100 пикселей. Этот элемент должен иметь класс .box
// и содержать текст, указывающий порядковый номер элемента
// (1, 2, 3 и так далее).
// - При нажатии на кнопку "Удалить элемент" удаляется
// последний добавленный элемент, если таковой имеется.
// - При нажатии на кнопку "Клонировать элемент" создается
// копия последнего добавленного элемента и добавляется на
// страницу. Если последнего добавленного элемента нет на
// странице, необходимо вывести сообщение в alert, с надписью
// о невозможности клонирования, так как клонировать нечего.

// const containerElement = document.querySelector("#container");

// const addButtonElement = document.querySelector("#addButton");
// addButtonElement.addEventListener("click", function () {
//   const divElement = document.createElement("div");
//   divElement.classList.add("box");
//   const listBox = document.querySelectorAll(".box");
//   const listBoxCount = listBox.length;
//   divElement.textContent = listBoxCount + 1;
//   containerElement.append(divElement);
// });

// const removeButtonElement = document.querySelector("#removeButton");

// removeButtonElement.addEventListener("click", function () {
//   containerElement.lastElementChild?.remove();
// });

// const cloneButtonElement = document.querySelector("#cloneButton");

// cloneButtonElement.addEventListener("click", function () {
//   const lastChildElement = containerElement.lastElementChild;
//   if (lastChildElement) {
//     containerElement.append(lastChildElement.cloneNode(true));
//   } else {
//     alert("Клонировать нечего!");
//   }
// });

// Задание 3.
// Необходимо создать страницу со списком статей.
// Каждая статья состоит из id, заголовка, текста статьи.
// id - будем брать из unix timestamp.
// Необходимо подготовить список статей в JSON-формате,
// которые будут выводиться на странице при первом ее
// открытии.
// Необходимо реализовать возможность удаления статьи.
// Необходимо реализовать возможность добавления статьи.
// Необходимо реализовать возможность изменения статьи,
// ввод данных можно реализовать через prompt.
// Статьи должны сохраняться в локальное хранилище
// браузера, и должны быть доступны после перезагрузки
// страницы.

const initialJSON = `[{"id":1702889102621,"title":"Статья 1","text":"Text 1"},{"id":1702889103318,"title":"Статья 2","text":"Text 2"}]`;

const localStorageKey = "articles";
const data = localStorage.getItem(localStorageKey);

if (!data) {
  localStorage.setItem(localStorageKey, initialJSON);
}

const articles = JSON.parse(localStorage.getItem(localStorageKey));

// все статьи объединяем в одну строку
const articlesHtml = articles
  .map((article) => getArticleHtml(article))
  .join("");

const conteinerElement = document.querySelector(".conteiner");

// добавляем все на страницу
conteinerElement.innerHTML = articlesHtml;

// возвращает нам статью как HTML код строкой для отражения на странице и записи в locStor
function getArticleHtml(article) {
  return `<div class="article" data-id="${article.id}">
  <div class="title">${article.title}</div>
  <p class="text">${article.text}</p>
  <button class="delete">delete</button>
  <button class="edit">edit</button>
</div>`;
}

// добавление статей
const addButtonElement = document.querySelector(".add");
addButtonElement.addEventListener("click", function () {
  const title = prompt("Введите заголовок статьи");
  const text = prompt("Введите текст статьи");

  const article = {
    id: Date.now(), // id берем из TimeStamp
    title, // title: title
    text, // text: text
  };
  articles.push(article);
  localStorage.setItem(localStorageKey, JSON.stringify(articles));

  conteinerElement.insertAdjacentHTML("beforeend", getArticleHtml(article));
});

// Изменение статей
const changeButtonElement = document.querySelector(".edit");
changeButtonElement.addEventListener("click", function (event) {
  // ищем статью через ближайший .article
  const parentElement = event.target.closest(".article");

  // ищем статью в массиве
  const id = +parentElement.dataset.id;
  const indexArticle = articles.findIndex((article) => article.id === id);
  let article = articles[indexArticle];

  //Вводим название и текст статьи с проверкой на пустоту
  const title = prompt("Введите заголовок статьи");
  while (!title) {
    title = prompt("Введите заголовок статьи");
  }
  const text = prompt("Введите текст статьи");
  while (!title || !text) {
    text = prompt("Введите текст статьи");
  }

  // меняем статью в массиве на наши введенные ранее заголовок и текст
  article.title = title;
  article.text = text;

  // меняем в массиве бывшую статью на новую
  articles[indexArticle] = article;
  // обновляем хранилище
  localStorage.setItem(localStorageKey, JSON.stringify(articles));
  //  теперь надо в Parent elemen(наша статья в html) внести иземения в текст
//   conteinerElement.insertAdjacentHTML("beforeend", getArticleHtml(article));
  parentElement.innerHTML = getArticleHtml(article);
});

// удаление статей
conteinerElement.addEventListener("click", function (event) {
  if (!event.target.classList.contains("delete")) {
    return;
  }

  const parentElement = event.target.closest(".article");
  const id = +parentElement.dataset.id;
  const indexArticle = articles.findIndex((article) => article.id === id);
  articles.splice(indexArticle, 1);

  localStorage.setItem(localStorageKey, JSON.stringify(articles));
  parentElement.remove();
});
