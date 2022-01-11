import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { removeExpense, enterInEditMode } from '../actions';
import { tablesHeads } from '../data';

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
    <table>
      <thead>
        <tr>
          {tablesHeads.map((head, index) => (
            <th key={ index }>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {walletExpenses.map((
          { id, value, description, currency, method, tag, exchangeRates },
        ) => (
          <tr key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{method}</td>
            <td>{value}</td>
            <td>{exchangeRates[currency].name.split('/')[0]}</td>
            <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
            <td>{calculateCurrencyValue(value, currency, exchangeRates)}</td>

            <td>
              Real
              {
                /* exchangeRates[currency].name.split('/')[1] */
              }

            </td>
            <td>
              <button
                type="button"
                data-testid="edit-btn"
                onClick={ () => editExpense(id) }
              >
                <FaEdit />
              </button>

              <button
                type="button"
                data-testid="delete-btn"
                onClick={ () => deleteExpense(id) }
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
