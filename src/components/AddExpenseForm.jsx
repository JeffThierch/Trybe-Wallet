import React, { useState } from 'react';

export default function AddExpenseForm() {
  const [valueExpense, changeValue] = useState(0);
  const [description, changeDescription] = useState('');
  const [currency, changeCurrency] = useState('');
  const [paymentMethod, changePaymentMethod] = useState('cash');
  const [tag, changeTag] = useState('food');
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
      <section>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            data-testid="currency-input"
            onChange={ ({ target: { value } }) => changeCurrency(value) }
            value={ currency }
          >
            <option>ola</option>
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
            <option value="cash">Dinheiro</option>
            <option value="credit-card">Cartão de crédito</option>
            <option value="debit-card">Cartão de débito</option>
          </select>
        </label>
      </section>
      <section>
        <label htmlFor="tag-input">
          Metodo de Pagamento:
          <select
            id="tag-input"
            data-testid="tag-input"
            value={ tag }
            onChange={ ({ target: { value } }) => changeTag(value) }
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="job">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health-care">Saúde</option>
          </select>
        </label>
      </section>
      <button type="button">Adicionar despesa</button>
    </form>
  );
}
