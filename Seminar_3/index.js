/* Вы разрабатываете интернет-магазин и хотите добавить
функциональность динамической фильтрации товаров по
категориям. У вас есть форма с выпадающим списком (select), в
котором пользователь может выбрать категорию товаров, 
значения необходимо сформировать исходя их имеющихся товаров. 
При выборе категории товаров, необходимо динамически обновлять 
список отображаемых товаров на странице, чтобы пользователь 
видел только товары из выбранной категории.
1. Создайте интерфейс веб-страницы, который включает в себя
следующие элементы:
a. Выпадающий список (select) с категориями товаров.
b. Список товаров, который будет отображать товары в
соответствии с выбранной категорией.
c. Каждый товар в списке должен содержать название и
категорию.

При выборе категории товаров в выпадающем списке, форма
должна следить за изменениями.
Динамически обновляйте список товаров на странице, чтобы
отображать только товары из выбранной категории.
Стилизуйте элементы интерфейса с помощью CSS для улучшения
внешнего вида. */
// const selectElement = document.querySelector("#categories");
// const containerElement = document.querySelector(".container");

// const productsData = [
//   {
//     id: 1,
//     name: "Ноутбук",
//     category: "Электроника",
//   },
//   {
//     id: 2,
//     name: "Смартфон",
//     category: "Электроника",
//   },
//   {
//     id: 3,
//     name: "Кофемашина",
//     category: "Бытовая техника",
//   },
//   {
//     id: 4,
//     name: "Фотокамера",
//     category: "Электроника",
//   },
//   {
//     id: 5,
//     name: "Микроволновая печь",
//     category: "Бытовая техника",
//   },
//   {
//     id: 6,
//     name: "Книга",
//     category: "Книги",
//   },
//   {
//     id: 7,
//     name: "Футболка",
//     category: "Одежда",
//   },
//   {
//     id: 8,
//     name: "Шапка",
//     category: "Одежда",
//   },
//   {
//     id: 9,
//     name: "Стул",
//     category: "Мебель",
//   },
//   {
//     id: 10,
//     name: "Стол",
//     category: "Мебель",
//   },
// ];

// showProducts(productsData);

// const categories = new Set(productsData.map((product) => product.category));

// categories.forEach((element) => {
//   selectElement.insertAdjacentHTML(
//     "beforeend",
//     `<option value="${element}">${element}</option>`
//   );
// });

// selectElement.addEventListener("change", function (e) {
//   containerElement.innerHTML = "";
//   const filteredData =
//     e.target.value === "all"
//       ? productsData
//       : productsData.filter((product) => product.category === e.target.value);

//       showProducts(filteredData);
// });


// function showProducts(productList) {
//   productList.forEach((element) => {
//     containerElement.insertAdjacentHTML(
//       "beforeend",
//       `<div class="selectedProduct">
//     <h3>${element.id}</h3>
//     <h2>${element.name}</h2>
//     <h3>${element.category}</h3>
//   </div>`
//     );
//   });
// }





