// Урок 2. События, формы
// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.

// Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.
// Для создания элементов интерфейса используйте HTML.
// При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.
// Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.
// Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

const nextButElement = document.querySelector(".nextBut");
const prevButElement = document.querySelector(".prevBut");
const sliderBoxElement = document.querySelector(".sliderBox");
const navBoxElement = document.querySelector(".navBox");
// звуки для кнопок
const audio = new Audio(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/clickUp.mp3"
);

let sliderElementsSourceList = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
];

let classList = ["left", "mediumLeft", "main", "mediumRight", "right"];
let newClassList = [];

// красим центральную кнопку (вызывается в DataLoader и в событиях по кликам)
function paintCentralButton() {
  let navPointElementsList = document.querySelectorAll(".navPoint");
  // снимаем у всех кнопок класс checked
  navPointElementsList.forEach((element) => {
    element.classList.remove("checked");
  });

  const mainElement = document.querySelector(".main");
  const source = mainElement.getAttribute("src");
  console.log(source[7]);
  navPointElementsList = [...document.querySelectorAll(".navPoint")];
  const elToPaint = navPointElementsList.find((element) => {
    return element.textContent === source[7];
  });
  elToPaint.classList.add("checked");
}

function dataLoader(sliderElementsSourceList, classList) {
  for (let i = 0; i < classList.length; i++) {
    // подгружаем данные для слайдера
    const imgElement = document.createElement("img");
    sliderBoxElement.append(imgElement);
    // меняем HTML на наш шаблонизатор
    imgElement.outerHTML = `<img src="${sliderElementsSourceList[i]}" alt="image" class="${classList[i]}" />`;
    // подгружаем навигационные кнопки
    const navPointElement = document.createElement("div");
    navBoxElement.append(navPointElement);
    navPointElement.outerHTML = `<div class="navPoint">${i + 1}</div>`;
  }
  // красим центральную кнопку
  paintCentralButton();
}

// инициализируем первичное отражение данных, принимая массив классов и названий картинок
dataLoader(sliderElementsSourceList, classList);

// функция присваивания элементам новых классов работает внутри кликов ниже
function setClass() {
  const imagesList = document.getElementsByTagName("img");
  for (let i = 0; i < imagesList.length; i++) {
    imagesList[i].className = newClassList[i];
  }
  classList = newClassList;
  newClassList = [];
}

// клик назад
prevButElement.addEventListener("click", function (e) {
  audio.play();
  for (let i = 1; i < classList.length; i++) {
    //создаем новый массив класов сдвинутых на 1 индекс назад
    newClassList.push(classList[i]);
  }
  newClassList.push(classList[0]);
  // присваиваем элементам новые классы
  setClass();

  // красим навигационную кнопку следующую
  paintCentralButton();
});

// клик вперед
nextButElement.addEventListener("click", function (e) {
  audio.play();
  //создаем новый массив класов сдвинутых на 1 индекс вперед
  // пушим последний сначала
  newClassList.push(classList[classList.length - 1]);
  //пушим остальные
  for (let i = 0; i < classList.length - 1; i++) {
    newClassList.push(classList[i]);
  }
  // присваиваем элементам новые классы
  setClass();

  // красим навигационную кнопку следующую
  paintCentralButton();
});

// клики по кнопкам навигации
const navPointElementsList = document.querySelectorAll(".navPoint");
navPointElementsList.forEach((element) => {
  element.addEventListener("click", function () {
    audio.play();
    // снимаем у всех кнопок класс checked
    navPointElementsList.forEach((element) => {
      element.classList.remove("checked");
    });
    // красим кликнутую кнопку
    element.classList.add("checked");
    // paintCentralButton();

    const clickEvent = new Event("click");
    const mainElement = document.querySelector(".main");
    const attributeMainElem = mainElement.getAttribute("src");
    // находим разницу в отставании номера главного элемента от номера кнопки
    let difference = +element.textContent - +attributeMainElem[7];

    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        nextButElement.dispatchEvent(clickEvent); //  вызываем искусственный клик
      }
    } else {
      difference = Math.abs(difference);
      for (let i = 0; i < difference; i++) {
        prevButElement.dispatchEvent(clickEvent); // вызываем искусственный клик
      }
    }
  });
});
