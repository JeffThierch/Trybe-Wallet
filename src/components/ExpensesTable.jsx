import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import { removeExpense, enterInEditMode } from '../actions';
import { tablesHeads } from '../data';
import '../styles/ExpensesTable.css';

export default function ExpensesTable() {
  const walletExpenses = useSelector((state) => state.wallet.expenses);
  const { currencieUsed } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const calculateCurrencyValue = (value, currency, exchangeRates) => {
    if (currencieUsed !== 'BRL') {
      const convertedCurrencyValueInBRL = Number(exchangeRates[currency].ask);
      const baseCurrencieValueInBRL = Number(exchangeRates[currencieUsed].ask);

      const convertionValue = (convertedCurrencyValueInBRL / baseCurrencieValueInBRL);

      if (convertionValue !== 0) {
        const totalAmount = (convertionValue * value);
        return totalAmount.toFixed(2);
      }

      const totalAmount = (1 * value);
      return totalAmount.toFixed(2);
    }

    const convertedCurrencyValue = Number(exchangeRates[currency].ask);
    const totalAmount = (convertedCurrencyValue * value);
    return totalAmount.toFixed(2);
  };

  const returnUtilizedExchange = (currency, exchangeRates) => {
    if (currencieUsed !== 'BRL') {
      if (currencieUsed !== 'BTC') {
        const convertedCurrencyValueInBRL = Number(exchangeRates[currency].ask);
        const baseCurrencieValueInBRL = Number(exchangeRates[currencieUsed].ask);

        const convertionValue = (convertedCurrencyValueInBRL / baseCurrencieValueInBRL);

        return convertionValue.toFixed(2);
      }
      const convertedCurrencyValueInBRL = Number(exchangeRates[currency].ask);
      const baseCurrencieValueInBRL = Number(exchangeRates[currencieUsed].ask
        .replace('.', ''));

      const convertionValue = (convertedCurrencyValueInBRL / baseCurrencieValueInBRL);

      return convertionValue.toFixed(5);
    }
    return Number(exchangeRates[currency].ask).toFixed(2);
  };

  const returnCurrencyName = (currency, exchangeRates) => {
    if (currency !== 'BRL') {
      return exchangeRates[currency].name.split('/')[0];
    }
    return 'Real';
  };

  const getCurrencySymbol = (currency) => {
    const simbol = getSymbolFromCurrency(currency);
    return simbol === undefined ? '$' : simbol;
  };

  const deleteExpense = (expenseID) => {
    dispatch(removeExpense(expenseID));
  };

  const editExpense = (expenseID) => {
    const expenseToEdit = walletExpenses.filter(({ id }) => id === expenseID);
    dispatch(enterInEditMode(expenseToEdit[0]));
  };

  return (
    <table className="Table-main-container">
      <thead className="Table-thead-container">
        <tr>
          {tablesHeads.map((head, index) => (
            <th key={ index }>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody className="Table-tbody-container">
        {walletExpenses.map((
          { id, value, description, currency, method, tag, exchangeRates },
        ) => (
          <tr classNam="Table-expense-row" key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>
              {`${getCurrencySymbol(currency)}${parseFloat(value)
                .toFixed(2)}` }
            </td>
            <td>
              {returnCurrencyName(currency, exchangeRates)}
            </td>
            <td>
              {`
            ${getCurrencySymbol(currencieUsed)}
            ${returnUtilizedExchange(currency, exchangeRates)}
            `}
            </td>
            <td>
              {`
            ${getCurrencySymbol(currencieUsed)}
            ${calculateCurrencyValue(value, currency, exchangeRates)}
            `}
            </td>

            <td>
              {
                returnCurrencyName(currencieUsed, exchangeRates)
                // o teste quebra se colocar o nome dinamicamente
                /* exchangeRates[currency].name.split('/')[1] */
              }
            </td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => editExpense(id) }
                className="edit-btn"
              >
                <FaEdit />
              </button>

              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => deleteExpense(id) }
                className="delete-btn"

              >
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}
