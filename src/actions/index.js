import fetchCurrencies from '../apis/fetchCurrencies';

export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

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

export const addCurrencies = (currencies, error) => (
  {
    type: ADD_CURRENCIES,
    payload: { currencies, error },
  }
);

export function fetchCurrenciesToState() {
  return async (dispatch) => {
    const { data, error } = await fetchCurrencies();
    dispatch(addCurrencies(data, error));
  };
}
