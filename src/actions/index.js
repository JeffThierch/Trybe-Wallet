// Coloque aqui suas actions
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const setUserEmail = (email) => (
  {
    type: SET_USER_EMAIL,
    payload: email,
  }
);

export const addExpenseToWallet = (expense) => (
  {
    type: ADD_EXPENSE,
    payload: expense,
  }
);
