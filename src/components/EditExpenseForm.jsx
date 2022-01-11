import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tags, methods } from '../data';
import { finishEditionOfExpense } from '../actions';

export default function EditExpenseForm() {
  const dispatch = useDispatch();
  const fetchedCurrencies = useSelector((state) => state.wallet.currencies);
  const {
    value,
    currency,
    method,
    tag,
    description,
    id,
    exchangeRates } = useSelector((state) => state.wallet.expenseToEdit);

  const [valueExpense, changeValue] = useState(value);
  const [tagValue, changeTagValue] = useState(tag);
  const [currencyValue, changeCurrency] = useState(currency);
  const [paymentMethod, changePaymentMethod] = useState(method);
  const [descriptionValue, changeDescriptionValue] = useState(description);

  const handleBtnClick = () => {
    dispatch(finishEditionOfExpense({
      id,
      value: valueExpense,
      currency: currencyValue,
      method: paymentMethod,
      tag: tagValue,
      description: descriptionValue,
      exchangeRates,
    }));
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
            onChange={ ({ target }) => changeValue(target.value) }
          />
        </label>
      </section>

      <section>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            data-testid="currency-input"
            onChange={ ({ target }) => changeCurrency(target.value) }
            value={ currencyValue }
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
            onChange={ ({ target }) => changePaymentMethod(target.value) }
          >
            {methods.map((methodValue, index) => (
              <option key={ index } value={ methodValue }>{methodValue}</option>
            ))}

          </select>
        </label>
      </section>

      <section>
        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            data-testid="tag-input"
            value={ tagValue }
            onChange={ ({ target }) => changeTagValue(target.value) }
          >
            {tags.map((tagItem, index) => (
              <option value={ tagItem } key={ index }>{tagItem}</option>
            ))}
          </select>
        </label>
      </section>

      <section>
        <label htmlFor="description-input">
          Descricao:
          <input
            type="text"
            value={ descriptionValue }
            id="description-input"
            data-testid="description-input"
            onChange={ ({ target }) => changeDescriptionValue(target.value) }
          />
        </label>
      </section>

      <button type="button" onClick={ handleBtnClick }>Editar despesa</button>
    </form>
  );
}
