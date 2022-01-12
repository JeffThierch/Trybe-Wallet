import fetchCurrencies from '../apis/fetchCurrencies';

export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ENTER_EDIT_MODE = 'ENTER_EDIT_MODE';
export const FINISH_EDITION = 'FINISH_EDITION';

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

export const removeExpense = (expenseID) => (
  {
    type: REMOVE_EXPENSE,
    payload: expenseID,
  }
);

export const addCurrencies = (currenciesKeys, currenciesData, error) => (
  {
    type: ADD_CURRENCIES,
    payload: { currenciesKeys, currenciesData, error },
  }
);

export const enterInEditMode = (expenseToEdit) => (
  {
    type: ENTER_EDIT_MODE,
    payload: expenseToEdit,
  }
);

export const finishEditionOfExpense = (editedExpense) => (
  {
    type: FINISH_EDITION,
    payload: editedExpense,
  }
);

export function fetchCurrenciesToState() {
  return async (dispatch) => {
    const { keys, currenciesData, error } = await fetchCurrencies();
    dispatch(addCurrencies(keys, currenciesData, error));
  };
}
