import React from 'react';
import { useSelector } from 'react-redux';
import AddExpenseForm from '../components/AddExpenseForm';
import EditExpenseForm from '../components/EditExpenseForm';
import ExpensesTable from '../components/ExpensesTable';
import Header from '../components/Header';

function Wallet() {
  const isInEditMode = useSelector((state) => state.wallet.isInEditMode);
  return (
    <>
      <Header />
      <main>
        {isInEditMode ? <EditExpenseForm /> : <AddExpenseForm /> }
        <ExpensesTable />
      </main>

    </>
  );
}

export default Wallet;
