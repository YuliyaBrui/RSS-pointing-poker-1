
import { ADD_CURRENT_USER } from '../actions/currentUser';
import { IFormGameValue } from '../types/forms';

const initialState = {};

export const addCurrentUser = (
  state = initialState,
  action: { type: string; currentUser: IFormGameValue },
): any => {
  switch (action.type) {
    case ADD_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
};
