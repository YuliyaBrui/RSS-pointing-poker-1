import { IFormGameValue } from '../types/forms';

export const ADD_CURRENT_USER = 'ADD_CURRENT_USER';
export const IS_REGISTATION = 'IS_REGISTATION';
export const addCurrentUser = (currentUser: IFormGameValue): any => ({
  type: ADD_CURRENT_USER,
  currentUser,
});
