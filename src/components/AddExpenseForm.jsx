import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpenseToWallet, fetchCurrenciesToState } from '../actions';

export default function AddExpenseForm() {
  const [valueExpense, changeValue] = useState(0);
  const [description, changeDescription] = useState('');
  const [currency, changeCurrency] = useState('USD');
  const [paymentMethod, changePaymentMethod] = useState('cash');
  const [tag, changeTag] = useState('food');

  const dispatch = useDispatch();
  const walletExpenses = useSelector((state) => state.wallet.expenses);
  const fetchedCurrencies = useSelector((state) => state.wallet.currencies);
  const currenciesData = useSelector((state) => state.wallet.currenciesData);

  useEffect(() => {
    dispatch(fetchCurrenciesToState());
  }, [dispatch]);

  const handleBtnClick = () => {
    dispatch(fetchCurrenciesToState());

    dispatch(addExpenseToWallet(
      {
        id: walletExpenses.length,
        value: valueExpense.toString(),
        description,
        currency,
        method: paymentMethod,
        tag,
        exchangeRates: { ...currenciesData },
      },
    ));

    changeValue(0);
    changeDescription('');
    changeCurrency('USD');
    changePaymentMethod('cash');
    changeTag('food');
  };

  return (
    <form>

      <section>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            id="value-input"
            value={ valueExpense }
            data-testid="value-input"
            onChange={ ({ target: { value } }) => changeValue(parseFloat(value)) }
          />
        </label>
      </section>

      <section>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
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
        <label htmlFor="method-input">
          Metodo de Pagamento:
          <select
            id="method-input"
            data-testid="method-input"
            value={ paymentMethod }
            onChange={ ({ target: { value } }) => changePaymentMethod(value) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
      </section>

      <section>
        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            data-testid="tag-input"
            value={ tag }
            onChange={ ({ target: { value } }) => changeTag(value) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </section>

      <section>
        <label htmlFor="description-input">
          Descricao:
          <input
            type="text"
            value={ description }
            id="description-input"
            data-testid="description-input"
            onChange={ ({ target: { value } }) => changeDescription(value) }
          />
        </label>
      </section>

      <button type="button" onClick={ handleBtnClick }>Adicionar despesa</button>
    </form>
  );
}
