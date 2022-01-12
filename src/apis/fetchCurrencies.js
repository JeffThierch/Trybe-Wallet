const fetchCurrencies = async () => {
  const API_RESPONSE = {
    keys: [],
    currenciesData: {},
    error: '',
  };
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

    const currenciesKeys = Object.keys(data).filter((key) => key !== 'USDT');

    API_RESPONSE.keys = currenciesKeys;
    API_RESPONSE.currenciesData = data;
    return API_RESPONSE;
  } catch (err) {
    API_RESPONSE.error = err;
    return API_RESPONSE;
  }
};

export default fetchCurrencies;
