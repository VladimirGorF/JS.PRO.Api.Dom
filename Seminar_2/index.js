window.addEventListener('scroll', function (e) {
  ;
  console.log(document.querySelector('.divland').innerHTML = scrollY + 'px');
});

// Вам необходимо создать навигационное меню для веб-сайта, в
// котором меняется активный пункт при клике без фактического
// перехода на другие страницы. Меню должно обладать следующими
// характеристиками:
// 1. Подсветка активного пункта: При клике на пункт меню он
// должен становиться активным, и для активного пункта должен
// применяться определенный стиль (например, изменение цвета
// фона). Если выбрать другой пункт, предыдущий должен
// перестать быть активным.
// 2. Эффекты наведения: При наведении курсора на пункты меню
// должны применяться эффекты (например, изменение цвета
// текста или фона) для подсказки пользователю, что пункт меню
// является интерактивным.

// const menulinkElements = document.querySelectorAll(".menu__link");
// let activeElement = document.querySelector(".active");

// menulinkElements.forEach((element) => {
//   element.addEventListener("click", function (e) {
//     activeElement.classList.remove("active");
//     element.classList.add("active");
//     activeElement = element;
//   });
// });

// Задание 2.

// Создайте простое модальное окно, которое появляется при клике
// на кнопку "Открыть модальное окно" и закрывается при клике на
// кнопку "Закрыть". Модальное окно должно содержать заголовок
// "Модальное окно" и кнопку для закрытия. Модальное окно должно
// плавно появляться и исчезать при открытии и закрытии.

// const openButtonElement = document.querySelector('.but');
// const buttonBoxElement = document.querySelector('.buttonBox');
// const modalWindowElement = document.querySelector('.modalWindow');
// const closeElemnt = document.querySelector('.close');

// openButtonElement.addEventListener('click', function (e) {
//   modalWindowElement.classList.add('visible');
//   buttonBoxElement.classList.add('blur');
// });

// closeElemnt.addEventListener('click', function (e) {
//   modalWindowElement.classList.remove('visible');
//   buttonBoxElement.classList.remove('blur');
// });

// Задание 3.

// У вас есть кнопка "Купить". Создайте скрипт, который при клике
// на эту кнопку меняет её текст на "Товар добавлен в корзину" в
// течение 2 секунд, а затем возвращает исходный текст "Купить".
// В обработчике события клика также проверьте, является ли
// событие доверенным (event.isTrusted). Если событие является
// доверенным, выполните изменение текста кнопки и убедитесь,
// что после 2 секунд текст возвращается в исходное состояние.

// const buttonElement = document.querySelector('.but');

// buttonElement.addEventListener('click', function (e) {
//   if(e.isTrusted){
//     buttonElement.textContent ='Товар добавлен в корзину'
//     setTimeout(() => {
//       buttonElement.textContent = 'Купить eще'
//     }, 2000);
//   } else {
//     alert('Не мухлюйте!')
//   }
// });

// Задание 4

// Вам предоставляется задача создать простой онлайн опросник, который позволяет пользователям
// отвечать на вопросы с вариантами ответов. Ваша задача - разработать интерфейс и функциональность
// для этого опросника, используя HTML, CSS и JavaScript.
// 1. Создайте интерфейс с несколькими вопросами и вариантами ответов. Каждый вопрос должен
// иметь несколько вариантов ответов.
// 2. Реализуйте обработку событий, чтобы пользователи могли выбирать варианты ответов.
// 3. Добавьте кнопку "Завершить опрос", которая будет показывать результаты опроса.
// 4. При нажатии на кнопку "Завершить опрос", вы должны проверить, что пользователь ответил на все
// вопросы, и отобразить выбранные им варианты ответов.
// 5. Если пользователь не ответил на все вопросы, покажите ему сообщение о необходимости ответить
// на все вопросы перед завершением опроса.
// 6. По желанию можно добавить стилизацию опросника с использованием CSS для лучшего
// пользовательского опыта.

// const submitElement = document.querySelector("#submit");
// const questionList = document.querySelectorAll(".question");
// const resultElement = document.querySelector(".result");
// const resTemplateElement = document.querySelector("#resTemplate");
// const resultBoxElement = document.querySelector('.resultBox');

// submitElement.addEventListener("click", function (e) {
//   let allQuestionsDone = true;
//   questionList.forEach((element) => {
//     const inputList = [...element.querySelectorAll("input")];
//     if (!inputList.some((element) => element.checked)) {
//       element.classList.add("warning");
//       allQuestionsDone = false;
//     }
//   });
//   if (allQuestionsDone) {
//     const checkedListElements = [...document.querySelectorAll("input:checked")];
//     const resultElements = checkedListElements.map((inputEl, idx) => {
//       const templateHtml = resTemplateElement.content.cloneNode(true);
//       templateHtml.querySelector(".num").textContent = idx + 1;
//       templateHtml.querySelector(".answer").textContent = inputEl.value;
//       return templateHtml;
//     });
//     resultBoxElement.innerHTML = "";
//     resultElement.style.display = 'block';
//     // resultElement.style.removeProperty('display');
//     resultBoxElement.append(...resultElements);
//   }
// });
