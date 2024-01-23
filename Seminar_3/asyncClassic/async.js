// (async () => {
//   const url = "https://api.unsplash.com/photos?page=1&per_page=20&client_id=lfR60pruoyZ0dtELOQDhniia49JSOVJ5CGI_RMeGxP8";
//   const response = await fetch(url);
//   console.log(response.status);
//   console.log(response.ok);
//   const fact = await response.json();
//   console.log(fact);
// })();


// тоже самое с именованной функцией

async function asyncFunc() {
  const url = "https://api.unsplash.com/photos?page=1&per_page=20&client_id=lfR60pruoyZ0dtELOQDhniia49JSOVJ5CGI_RMeGxP8";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Вышла ощибка в получении данных! Статус ${response.status}`
    );
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
  isFetching = false;

};

asyncFunc();