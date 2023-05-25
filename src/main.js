import Swal from 'sweetalert2';

const ulElement = document.querySelector('.container main ul');
const h2Element = document.querySelector('.container main h2');
const inputElement = document.querySelector('header form input');
const buttonElement = document.querySelector('header form button');

const createliEl = (name, value) => {
  const liElement = document.createElement('li');
  liElement.innerHTML = `
  <b>${name}</b>
  <span>${value}</span>
  `;
  return liElement;
};

const renderCoins = (coins, baseCoin) => {
  ulElement.innerHTML = '';
  h2Element.innerHTML = `Valores referentes a 1 ${baseCoin}`;
  coins.forEach((coin) => {
    const liElement = createliEl(coin.name, coin.value.toFixed(2));
    ulElement.appendChild(liElement);
  });
};

const apiresult = () => {
  if(!inputElement.value) {
    Swal.fire({
      title: 'Erro!',
      text: 'Você precisa digitar uma moeda!',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    return;
  } 
  return fetch(`https://api.exchangerate.host/lastest?base=${inputElement.value}`)
      .then((response) => response.json())
        .then((data) => data);
};

buttonElement.addEventListener('click', () => {
  apiresult()
    .then((exchange) => {
      const rates = exchange.rates;
      const base = exchange.base;
      if(base !== inputElement.value.toUpperCase()) {
        Swal.fire({
          title: 'Erro!',
          text: 'A moeda informada não é válida!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        return;
      }
      const data = Object.entries(rates)
        .map((ratecoin) => {
          const [name, value] = ratecoin;
          return {
            name,
            value,
          }
        });
      renderCoins(data, base);
    });
});
