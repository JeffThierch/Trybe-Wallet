import {
  ADD_EXPENSE,
  ADD_CURRENCIES,
  REMOVE_EXPENSE,
  ENTER_EDIT_MODE,
  FINISH_EDITION,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  currenciesData: {},
  expenses: [],
  isInEditMode: false,
  expenseToEdit: {},
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FINISH_EDITION:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload;
        }
        return expense;
      }),
      isInEditMode: false,
      expenseToEdit: {},
    };

  case ENTER_EDIT_MODE:
    return {
      ...state,
      isInEditMode: true,
      expenseToEdit: action.payload,
    };

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
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };

  default:
    return state;
  }
};

export default wallet;
