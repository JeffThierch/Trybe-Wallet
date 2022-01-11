import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tags, methods } from '../data';
import { finishEditionOfExpense } from '../actions';

export default function EditExpenseForm() {
  const expenseToEdit = useSelector((state) => state.wallet.expenseToEdit);
  const fetchedCurrencies = useSelector((state) => state.wallet.currencies);
  const dispatch = useDispatch();

  const [valueExpense, changeValue] = useState(expenseToEdit.value);
  const [tagValue, changeTagValue] = useState(expenseToEdit.tag);
  const [currencyValue, changeCurrency] = useState(expenseToEdit.currency);
  const [paymentMethod, changePaymentMethod] = useState(expenseToEdit.method);
  const [descriptionValue, changeDescriptionValue] = useState(expenseToEdit.description);

  const handleBtnClick = () => {
    dispatch(finishEditionOfExpense({
      ...expenseToEdit,
      value: valueExpense,
      currency: currencyValue,
      method: paymentMethod,
      tag: tagValue,
      description: descriptionValue,
    }));
  };

  return (
    <form>
      <section>
        <label htmlFor="Edit-value-input">
          Valor:
          <input
            type="number"
            id="Edit-value-input"
            value={ valueExpense }
            onChange={ ({ target }) => changeValue(target.value) }
          />
        </label>
      </section>

      <section>
        <label htmlFor="Edit-currency-input">
          Moeda:
          <select
            id="Edit-currency-input"
            onChange={ ({ target }) => changeCurrency(target.value) }
            value={ currencyValue }
          >
            {fetchedCurrencies.map((key, index) => (
              <option
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
        <label htmlFor="Edit-method-input">
          Metodo de Pagamento:
          <select
            id="Edit-method-input"
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
        <label htmlFor="Edit-tag-input">
          Tag:
          <select
            id="Edit-tag-input"
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
        <label htmlFor="Edit-description-input">
          Descricao:
          <input
            type="text"
            value={ descriptionValue }
            id="Edit-description-input"
            onChange={ ({ target }) => changeDescriptionValue(target.value) }
          />
        </label>
      </section>

      <button type="button" onClick={ handleBtnClick }>Editar despesa</button>
    </form>
  );
}
