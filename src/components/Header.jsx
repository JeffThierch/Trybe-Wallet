import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const [currencieSelected, changeCurrency] = useState('BRL');
  const email = useSelector((state) => state.user.email);
  const walletExpenses = useSelector((state) => state.wallet.expenses);
  const currencies = useSelector((state) => state.wallet.currencies);
  return (
    <header>
      <p data-testid="email-field">{email}</p>
      <p data-testid="total-field">
        {
          walletExpenses
            .reduce((acc, { value }) => (acc + parseFloat(value)), 0)
            .toFixed(2)
        }
      </p>
      <select
        value={ currencieSelected }
        data-testid="header-currency-field"
        onChange={ ({ target: { value } }) => changeCurrency(value) }
      >
        <option value="BRL">BRL</option>
        {currencies.map((currencie) => (
          <option key={ currencie } value={ currencie }>{currencie}</option>
        ))}
      </select>

    </header>
  );
}

export default Header;
