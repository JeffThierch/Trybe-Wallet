import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserEmail } from '../actions';

function Login() {
  const [isDisabled, toggleDisabled] = useState(true);
  const [userEmail, changeUserEmail] = useState('');
  const [userPasswordLength, changeUserPassword] = useState(0);
  const dispatch = useDispatch();

  const handleEmailChange = ({ target: { value } }) => {
    changeUserEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    changeUserPassword(value.length);
  };

  const handleSubmit = () => {
    dispatch(setUserEmail(userEmail));
  };

  useEffect(() => {
    const MIN_PASSWORD_LENGHT = 6;
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isEmailValid = emailRegex.test(userEmail);

    if (isEmailValid && userPasswordLength >= MIN_PASSWORD_LENGHT) {
      toggleDisabled(false);
    } else {
      toggleDisabled(true);
    }
  }, [userEmail, userPasswordLength]);

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
            onChange={ handlePasswordChange }
          />
        </div>
        <div>
          <button type="button" disabled={ isDisabled } onClick={ handleSubmit }>Entrar</button>
        </div>
      </form>
    </main>);
}

export default Login;
