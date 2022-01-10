import React, { useEffect } from 'react';
import fetchCurrencies from './apis/fetchCurrencies';

function App() {
  useEffect(() => {
    const fetch = async () => {
      await fetchCurrencies();
    };
    fetch();
  }, []);
  return <div>Hello, TrybeWallet!</div>;
}

export default App;
