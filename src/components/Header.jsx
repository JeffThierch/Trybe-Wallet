import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/Header.css';
import getSymbolFromCurrency from 'currency-symbol-map';

function Header() {
  const userEmail = useSelector((state) => state.user.email);
  const walletExpenses = useSelector((state) => state.wallet.expenses);
  const currenciesKeys = useSelector((state) => state.wallet.currencies);

  const [currencieSelected, changeCurrency] = useState('BRL');

  const calculateTotal = (expenses) => {
    const total = expenses
      .reduce((acc, { value, exchangeRates, currency }) => (
        acc + (value * exchangeRates[currency].ask)
      ), 0);
    return total.toFixed(2).toString();
  };

  return (
    <header className="Header-main-container">
      <p className="Header-email" data-testid="email-field">{`Email: ${userEmail}`}</p>
      <section className="Header-total-container">
        <p className="Header-total" data-testid="total-field">
          {`
          Despesa Total: ${
    getSymbolFromCurrency(currencieSelected)}
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
