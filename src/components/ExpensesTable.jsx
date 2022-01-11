import React from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { removeExpense } from '../actions';
import { tablesHeads } from '../data';

export default function ExpensesTable() {
  const walletExpenses = useSelector((state) => state.wallet.expenses);
  const dispatch = useDispatch();

  const calculateCurrencyValue = (value, currency, exchangeRates) => {
    const convertedCurrencyValue = parseFloat(exchangeRates[currency].ask).toFixed(2);
    const totalAmount = (convertedCurrencyValue * value).toFixed(2);
    return totalAmount;
  };

  const deleteExpense = (expenseID) => {
    dispatch(removeExpense(expenseID));
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
            <td>{exchangeRates[currency].name.split('/')[1]}</td>
            <td>
              <button type="button">
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
