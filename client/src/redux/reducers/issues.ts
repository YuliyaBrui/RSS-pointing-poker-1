import { ADD_ISSUE, CHANGE_ISSUE, DELETE_ISSUE } from '../actions/issues';
import { IIssue } from '../types/issues';

const initialState: IIssue[] = [];

export const addIssue = (
  state = initialState,
  action: { type: string; issue: IIssue },
): any => {
  switch (action.type) {
    case ADD_ISSUE:
      return [...state, action.issue];
    case CHANGE_ISSUE:
      return [...state, action.issue];
    case DELETE_ISSUE:
      return state.filter((el: IIssue) => el.id !== action.issue.id);
    default:
      return state;
  }
};
