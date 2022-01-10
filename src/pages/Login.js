import React, { useState } from 'react';

function Login() {
  const [isDisabled, toggleDisabled] = useState(true);
  const [userEmail, changeUserEmail] = useState('');

  const checkIfEmailIsValid = () => {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isValid = emailRegex.test(userEmail);

    if (isValid) {
      toggleDisabled(false);
    } else {
      toggleDisabled(true);
    }
  };

  const handleEmailChange = ({ target: { value } }) => {
    console.log(value);
    changeUserEmail(value);
    checkIfEmailIsValid();
  };

  const handleSubmit = () => {

  };

  return (
    <main>
      <form>
        <div>
          <input
            type="email"
            data-testid="email-input"
            value={ userEmail }
            placeholder="Insira seu email"
            onChange={ handleEmailChange }
          />
          <input
            type="password"
            data-testid="password-input"
            placeholder="Insira sua senha"
            autoComplete="true"
          />
        </div>
        <div>
          <button type="button" disabled={ isDisabled } onClick={ handleSubmit }>Entrar</button>
        </div>
      </form>
    </main>);
}

export default Login;
