import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseToWallet, fetchCurrenciesToState } from '../actions';
import { tags, methods } from '../data';
import '../styles/AddExpensesForm.css';

export default function AddExpenseForm() {
  const dispatch = useDispatch();
  const walletExpenses = useSelector((state) => state.wallet.expenses);
  const fetchedCurrencies = useSelector((state) => state.wallet.currencies);
  const currenciesData = useSelector((state) => state.wallet.currenciesData);

  const [valueExpense, changeValue] = useState(0);
  const [description, changeDescription] = useState('');
  const [currency, changeCurrency] = useState('USD');
  const [paymentMethod, changePaymentMethod] = useState(methods[0]);
  const [tag, changeTag] = useState(tags[0]);

  useEffect(() => {
    dispatch(fetchCurrenciesToState());
  }, [dispatch]);

  const resetStateValues = () => {
    changeValue(0);
    changeDescription('');
    changeCurrency('USD');
    changePaymentMethod(methods[0]);
    changeTag(tags[0]);
  };

  const handleBtnClick = () => {
    dispatch(fetchCurrenciesToState());

    dispatch(addExpenseToWallet(
      {
        id: walletExpenses.length,
        value: valueExpense,
        description,
        currency,
        method: paymentMethod,
        tag,
        exchangeRates: { ...currenciesData },
      },
    ));

    resetStateValues();
  };

  return (
    <form className="AddExpenses-form-container">

      <section className="Add-value-container">
        <label htmlFor="Add-value-input">
          Valor:
          <input
            type="number"
            id="Add-value-input"
            value={ valueExpense }
            data-testid="value-input"
            onChange={ ({ target: { value } }) => changeValue(value) }
          />
        </label>
      </section>

      <section>
        <label htmlFor="Add-currency-input">
          Moeda:
          <select
            id="Add-currency-input"
            data-testid="currency-input"
            onChange={ ({ target: { value } }) => changeCurrency(value) }
            value={ currency }
          >
            {fetchedCurrencies.map((key, index) => (
              <option
                data-testid={ key }
                key={ index + 1 }
                value={ key }
              >
                {key}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section>
        <label htmlFor="Add-method-input">
          Metodo de Pagamento:
          <select
            id="Add-method-input"
            data-testid="method-input"
            value={ paymentMethod }
            onChange={ ({ target: { value } }) => changePaymentMethod(value) }
          >
            {methods.map((method, index) => (
              <option key={ index } value={ method }>{method}</option>
            ))}

          </select>
        </label>
      </section>

      <section>
        <label htmlFor="Add-tag-input">
          Tag:
          <select
            id="Add-tag-input"
            data-testid="tag-input"
            value={ tag }
            onChange={ ({ target: { value } }) => changeTag(value) }
          >
            {tags.map((value, index) => (
              <option value={ value } key={ index }>{value}</option>
            ))}
          </select>
        </label>
      </section>

      <section>
        <label htmlFor="Add-description-input">
          Descricao:
          <input
            type="text"
            value={ description }
            id="Add-description-input"
            data-testid="description-input"
            onChange={ ({ target: { value } }) => changeDescription(value) }
          />
        </label>
      </section>

      <button
        className="Add-btn-expense"
        type="button"
        onClick={ handleBtnClick }
      >
        Adicionar despesa
      </button>
    </form>
  );
}
