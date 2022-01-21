import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setUserEmail } from '../actions';
import '../styles/Login.css';

function Login() {
  const [isDisabled, toggleDisabled] = useState(true);
  const [userEmail, changeUserEmail] = useState('');
  const [userPasswordLength, changeUserPassword] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEmailChange = ({ target: { value } }) => {
    changeUserEmail(value);
  };

  const handlePasswordChange = ({ target: { value } }) => {
    changeUserPassword(value.length);
  };

  const handleSubmit = () => {
    dispatch(setUserEmail(userEmail));
    history.push('/carteira');
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
    <main className="main-container">
      <form className="form-container">
        <section className="Login-Logo-container">
          <h1>
            Trybe
          </h1>
          <span>Wallet</span>
        </section>
        <section className="Login-inputs-container">
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
        </section>
        <section className="Login-submit-container">
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ handleSubmit }
          >
            Entrar
          </button>
        </section>
      </form>
    </main>);
}

export default Login;
