
  const selectElement = document.querySelector('#cities');
  const informElement = document.querySelector(".infom");

selectElement.onchange = function () {

  switch (selectElement.value) {
    case "russia":
      informElement.textContent = "Москва";
      break;
    case "usa":
      informElement.textContent = "Вашингтон";
      break;
    case "germany":
      informElement.textContent = "Берлин";
      break;
    case "france":
      informElement.textContent = "Париж";
      break;
    default:
      informElement.textContent = "Выберите страну";
      break;
  }
};
