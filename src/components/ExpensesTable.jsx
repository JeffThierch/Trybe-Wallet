import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map';
import { removeExpense, enterInEditMode } from '../actions';
import { tablesHeads } from '../data';
import '../styles/ExpensesTable.css';

export default function ExpensesTable() {
  const walletExpenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  const calculateCurrencyValue = (value, currency, exchangeRates) => {
    const convertedCurrencyValue = parseFloat(exchangeRates[currency].ask);
    const totalAmount = (convertedCurrencyValue * value);
    return totalAmount.toFixed(2);
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
            <td>{`${getSymbolFromCurrency(currency)}${value}` }</td>
            <td>
              {exchangeRates[currency].name.split('/')[0]}
            </td>
            <td>
              {`
            ${getSymbolFromCurrency('BRL')}
            ${parseFloat(exchangeRates[currency].ask).toFixed(2)}
            `}
            </td>
            <td>
              {`
            ${getSymbolFromCurrency('BRL')}
            ${calculateCurrencyValue(value, currency, exchangeRates)}
            `}
            </td>

            <td>
              Real
              {
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
