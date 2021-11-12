import initModal from "./modal.js";

export default function initConverter() {
  const valorInputEl = document.querySelector("[data-js='valorInput']");
  const moedaSelectOneEl = document.querySelector("[data-js='selectOne']");
  const moedaSelectTwoEl = document.querySelector("[data-js='selectTwo']");
  const btnEl = document.querySelector("[data-js='btn']");
  const valorConvertido = document.querySelector("[data-js='valueConverted']");
  const swap = document.querySelector("[data-js='swap']");
  const dateSpan = document.querySelector("[data-js='date']");
  const taxaEl = document.querySelector("[data-js='valorMoedaOne']");

  valorInputEl.value = 1;

  async function getFetchApi(coinDe = "USD", coinPara = "BRL") {
    try {
      const dataFetch = await fetch(`https://economia.awesomeapi.com.br/json/${coinDe}-${coinPara}`);
      const response = await dataFetch.json();
      const resultado = response[0].ask;
      const regexp = /(\.)|(,(.*))/g;
      const valorAConverter = (valorInputEl.value.replace(regexp, "") * resultado).toFixed(2);

      taxaEl.innerHTML = `1 ${coinDe} = ${resultado} ${coinPara}`;

      valorConvertido.innerText = `${valorInputEl.value} ${moedaSelectOneEl.value} = ${valorAConverter} ${moedaSelectTwoEl.value}`;

      if (response.status === 404) {
        throw new Error();
      }
    } catch (err) {
      initModal();
    }
  }
  getFetchApi();

  const getSelectValue = () => {
    const moedaDeValue = moedaSelectOneEl.value;
    const moedaParaValue = moedaSelectTwoEl.value;
    getFetchApi(moedaDeValue, moedaParaValue);
  };

  const swapEl = (e) => {
    e.preventDefault();
    const temp = moedaSelectOneEl.value;
    moedaSelectOneEl.value = moedaSelectTwoEl.value;
    moedaSelectTwoEl.value = temp;
    getSelectValue();
  };

  const getDateCotacao = () => {
    const data = new Date();
    const dataFormatada = ((data.getDate() < 10) ? ("0" + data.getDate()) : data.getDate()) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
    dateSpan.innerText = dataFormatada;
  };
  getDateCotacao();

  const getSiglaCoins = async () => {
    const dataFetch = await fetch("../moedasSiglas.json");
    const response = await dataFetch.json();
    const responseKeys = Object.keys(response);

    const getOptions = (selectedCurrency) => responseKeys.map((currency) => `<option value="${currency}" ${currency === selectedCurrency ? 'selected' : ""}>${currency}</options>`).join("");

    moedaSelectOneEl.innerHTML = getOptions("USD");
    moedaSelectTwoEl.innerHTML = getOptions("BRL");
  };
  getSiglaCoins();

  swap.addEventListener("click", swapEl);
  btnEl.addEventListener("click", getSelectValue);
}
