import { SET_USER_EMAIL, CHANGE_BASE_CURRENCIE } from '../actions';

const INITIAL_STATE = {
  email: '',
  isAuth: false,
  currencieUsed: 'BRL',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_BASE_CURRENCIE:
    return {
      ...state,
      currencieUsed: action.payload,
    };
  case SET_USER_EMAIL:
    return {
      ...state,
      email: action.payload,
      isAuth: true,
    };
  default:
    return state;
  }
};

export default user;
