import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import { setBaseCurrencie } from '../actions';
import '../styles/Header.css';

function Header() {
  const userEmail = useSelector((state) => state.user.email);
  const walletExpenses = useSelector((state) => state.wallet.expenses);
  const { currencieUsed } = useSelector((state) => state.user);
  const currenciesKeys = useSelector((state) => state.wallet.currencies);

  const [currencieSelected, changeCurrency] = useState('BRL');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBaseCurrencie(currencieSelected));
  }, [currencieSelected, dispatch]);

  const calculateTotal = (expenses) => {
    const total = expenses
      .reduce((acc, { value, exchangeRates, currency }) => {
        if (currencieUsed !== 'BRL') {
          if (currencieUsed !== 'BTC') {
            const convertedCurrencyValueInBRL = parseFloat(exchangeRates[currency].ask);
            const baseCurrencieValueInBRL = parseFloat(exchangeRates[currencieUsed].ask);
            const convertionValue = (
              convertedCurrencyValueInBRL / baseCurrencieValueInBRL
            );
            return acc + (value * convertionValue);
          }

          const convertedCurrencyValueInBRL = parseFloat(exchangeRates[currency].ask.replace('.', ''));
          const bitcoinValueInBRL = parseFloat(exchangeRates[currencieUsed].ask
            .replace('.', ''));

          console.log(bitcoinValueInBRL, convertedCurrencyValueInBRL);

          const convertionValue = (
            convertedCurrencyValueInBRL / bitcoinValueInBRL
          );

          console.log(convertionValue);

          return acc + (value * convertionValue);
        }

        return acc + (value * exchangeRates[currency].ask);
      }, 0);

    if (currencieUsed === 'BTC') {
      const MAXIMUN_NUMBER_AFTER_COMMA = 5;

      return total.toFixed(MAXIMUN_NUMBER_AFTER_COMMA).toString();
    }

    return total.toFixed(2).toString();
  };

  const getCurrencySymbol = (currency) => {
    const simbol = getSymbolFromCurrency(currency);
    return simbol === undefined ? '$' : simbol;
  };

  return (
    <header className="Header-main-container">
      <section className="Header-Logo-container">
        <h1>Trybe</h1>
        <span>Wallet</span>
      </section>
      <section className="Header-total-container">
        <p className="Header-email" data-testid="email-field">{`Email: ${userEmail}`}</p>
        <p className="Header-total" data-testid="total-field">
          {`
          Total: ${
    getCurrencySymbol(currencieSelected)}
    ${calculateTotal(walletExpenses)} 
    `}
        </p>
        <label htmlFor="Header-currency-selector">
          Moeda:
          <select
            value={ currencieSelected }
            id="Header-currency-selector"
            data-testid="header-currency-field"
            onChange={ ({ target: { value } }) => changeCurrency(value) }
          >
            <option value="BRL">BRL</option>
            {currenciesKeys.map((currencie) => (
              <option key={ currencie } value={ currencie }>{currencie}</option>
            ))}
          </select>
        </label>

      </section>

    </header>
  );
}

export default Header;
