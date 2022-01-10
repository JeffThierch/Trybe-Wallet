const fetchCurrencies = async () => {
  const API_RESPONSE = {
    data: [],
    error: '',
  };
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();

    const objectToArray = Object.keys(data).map((key) => data[key]);
    const filteredData = objectToArray.filter(({ codein }) => codein !== 'BRLT');

    API_RESPONSE.data = filteredData;
    return API_RESPONSE;
  } catch (err) {
    API_RESPONSE.error = err;
    return API_RESPONSE;
  }
};

export default fetchCurrencies;
