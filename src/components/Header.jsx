import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
    <header>
      <p data-testid="email-field">{`Email: ${userEmail}`}</p>
      <p data-testid="total-field">
        {`
          Despesa Total:${calculateTotal(walletExpenses)} `}
      </p>
      <select
        value={ currencieSelected }
        data-testid="header-currency-field"
        onChange={ ({ target: { value } }) => changeCurrency(value) }
      >
        <option value="BRL">BRL</option>
        {currenciesKeys.map((currencie) => (
          <option key={ currencie } value={ currencie }>{currencie}</option>
        ))}
      </select>

    </header>
  );
}

export default Header;
