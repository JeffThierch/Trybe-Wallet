import React from 'react';
import { useSelector } from 'react-redux';

export default function ExpensesTable() {
  const walletExpenses = useSelector((state) => state.wallet.expenses);

  const calculateCurrencyValue = (value, currency, exchangeRates) => {
    const convertedCurrencyValue = parseFloat(exchangeRates[currency].ask).toFixed(2);
    const totalAmount = (convertedCurrencyValue * value).toFixed(2);
    return totalAmount;
  };

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
          <th>Editar/Excluir</th>
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
            <td>{calculateCurrencyValue(value, currency, exchangeRates)}</td>
            <td>{parseFloat(exchangeRates[currency].ask).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}
