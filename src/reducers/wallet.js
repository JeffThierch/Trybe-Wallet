import { ADD_EXPENSE, ADD_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  currenciesData: {},
  expenses: [],
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return {
      ...state,
      currencies: [...action.payload.currenciesKeys],
      error: action.payload.error,
      currenciesData: { ...action.payload.currenciesData },
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
