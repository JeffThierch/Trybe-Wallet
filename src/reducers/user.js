import { SET_USER_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
  isAuth: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
