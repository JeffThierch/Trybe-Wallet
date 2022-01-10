import React from 'react';
import { useSelector } from 'react-redux';

export default function ExpensesTable() {
  const walletExpenses = useSelector((state) => state.wallet.expenses);

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
        </tr>
      </thead>
      <tbody>
        {walletExpenses.map((
          { id, valueExpense, description, currency, paymentMethod, tag },
        ) => (
          <tr key={ id }>
            <td>{description}</td>
            <td>{tag}</td>
            <td>{paymentMethod}</td>
            <td>{valueExpense}</td>
            <td>{currency}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}
