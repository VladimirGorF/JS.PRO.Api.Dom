// Урок 1. Dom-дерево
// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"
// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие.
// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.
// Дополнительно (необязательная часть):
// Сохраняйте изменения в LocalStorage, чтобы они сохранялись при перезагрузке страницы.

// Начальные данные (JSON):
const initialJSON = `[
  {
      "id": 1,
      "name": "Йога",
      "time": "10:00 - 11:00",
      "maxParticipants": 15,
      "currentParticipants": 8
  },
  {
      "id": 2,
      "name": "Пилатес",
      "time": "11:30 - 12:30",
      "maxParticipants": 10,
      "currentParticipants": 5
  },
  {
      "id": 3,
      "name": "Кроссфит",
      "time": "13:00 - 14:00",
      "maxParticipants": 20,
      "currentParticipants": 15
  },
  {
      "id": 4,
      "name": "Танцы",
      "time": "14:30 - 15:30",
      "maxParticipants": 12,
      "currentParticipants": 10
  },
  {
      "id": 5,
      "name": "Бокс",
      "time": "16:00 - 17:00",
      "maxParticipants": 8,
      "currentParticipants": 6
  }
]`;

// создаем локальное хранилище
const localStorageKey = "lessons";
const data = localStorage.getItem(localStorageKey);

if (!data) {
  localStorage.setItem(localStorageKey, initialJSON);
}

// здесь все уроки в формате массива объектов
const lessons = JSON.parse(localStorage.getItem(localStorageKey));
//контейнер страницы
const conteinerElement = document.querySelector(".conteiner");

// из хранилища в html публикуем все
showLessons();

// создаем события для кликов по кнопкам join
clickJoinEvent();

// создаем события для кликов по кнопкам cancel
clickCancelEvent();

// функция создания событий для кликов по кнопкам Join
function clickJoinEvent() {
  // ищем кнопки записаться и создаем для всех событие по клику
  const joinElements = document.querySelectorAll(".join");

  // запускаем клики join
  joinElements.forEach((element) => {
    element.addEventListener("click", function (event) {
      // ищем название урока:
      const lessonElement = event.target.parentElement;
      const lessonName = lessonElement.querySelector(".title").textContent;
      joinClasses(lessonName);
    });
  });
}

// функция создания событий для кликов по кнопкам Cancel
function clickCancelEvent() {
  // ищем кнопки cancel и создаем для всех событие по клику
  const cancelElements = document.querySelectorAll(".cancel");

  // запускаем клики cancel
  cancelElements.forEach((element) => {
    element.addEventListener("click", function (event) {
      // ищем название урока:
      const lessonElement = event.target.parentElement;
      const lessonName = lessonElement.querySelector(".title").textContent;

      cancelClasses(lessonName);
    });
  });
}

// из хранилища в html публикует
function showLessons() {
  // очистка контейнера
  conteinerElement.replaceChildren();

  // все статьи объединяем в одну строку
  const lessonHtml = lessons.map((lesson) => getLessonsHtml(lesson)).join("");

  // добавляем все заголовки на страницу
  conteinerElement.innerHTML = lessonHtml;
}

// возвращает нам статью как HTML код строкой для отражения на странице и записи в locStor
function getLessonsHtml(lesson) {
  return `<div class="lesson" data-id="${lesson.id}">
  <div class="title">${lesson.name}</div>
  <p class="text">${lesson.time}</p>
  <p class="text">MaxParticipants: ${lesson.maxParticipants}</p>
  <p class="text">CurrentParticipants: ${lesson.currentParticipants}</p>
  <button class="join">Join to classes</button>
  <button class="cancel">Cancel participation</button>
</div>`;
}

// функция записи на уроки принимает
function joinClasses(lessonName) {
  lessons.forEach((lesson) => {
    if (
      lesson.name === lessonName &&
      lesson.currentParticipants < lesson.maxParticipants
    ) {
      // увеличиваем кол-во записанных и изменяем хранилище
      lesson.currentParticipants++;
      localStorage.setItem(localStorageKey, JSON.stringify(lessons));
      alert(
        `Вы записаны на ${lesson.name}, в ${lesson.time}, под номером ${lesson.currentParticipants}.`
      );
    }
  });
  // обновляем html
  showLessons();

  // создаем события для кликов по кнопкам join
  clickJoinEvent();

  // создаем события для кликов по кнопкам cancel
  clickCancelEvent();
}

// функция отмены записи
function cancelClasses(lessonName) {
  lessons.forEach((lesson) => {
    if (lesson.name === lessonName && lesson.currentParticipants > 0) {
      // увеличиваем кол-во записанных и изменяем хранилище
      lesson.currentParticipants--;
      localStorage.setItem(localStorageKey, JSON.stringify(lessons));
      alert("Ваша запись отменена!");
    }
  });
  // обновляем html
  showLessons();

  // создаем события для кликов по кнопкам join
  clickJoinEvent();

  // создаем события для кликов по кнопкам cancel
  clickCancelEvent();
}
