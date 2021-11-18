const apiCurrencyQuotes = async () => {
  try {
    const returnApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const dataJson = returnApi.json();
    return dataJson;
  } catch (error) {
    return error;
  }
};

export default apiCurrencyQuotes;
