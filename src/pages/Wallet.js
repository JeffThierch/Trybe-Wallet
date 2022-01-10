import React from 'react';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <AddExpenseForm />
        <ExpensesTable />
      </>
    );
  }
}

export default Wallet;
