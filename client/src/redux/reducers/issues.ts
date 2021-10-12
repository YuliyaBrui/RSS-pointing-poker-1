import { IFetchAddIssueAction, IIssue, IIssueState, IssueActionTypes } from '../types/issues';

const initialState: IIssueState = {
  issues: [],
}

export const addIssueReducer = (
  state: IIssueState = initialState,
  action: IFetchAddIssueAction,
): IIssueState => {
  switch (action.type) {
    case IssueActionTypes.ADD_ISSUE:
      return {
        ...state,
        issues: [...state.issues, action.payload.issue],
      }
    default:
      return state;
  }
};
