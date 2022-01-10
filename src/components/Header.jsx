import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
  const email = useSelector((state) => state.user.email);
  return (
    <header>
      <p data-testid="email-field">{email}</p>
      <p data-testid="total-field">
        0
        <span data-testid="header-currency-field">BRL</span>
      </p>
    </header>
  );
}

export default Header;
