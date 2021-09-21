import { IFormGameValue } from '../types/forms';

export const ADD_CURRENT_USER = 'ADD_CURRENT_USER';

export const addCurrentUser = (currentUser: IFormGameValue): any => ({
  type: ADD_CURRENT_USER,
  currentUser,
});
