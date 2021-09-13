import { IIssue } from '../types/issues';

export const ADD_ISSUE = 'ADD_ISSUE';
export const CHANGE_ISSUE = 'CHANGE_ISSUE';
export const DELETE_ISSUE = 'DELETE_ISSUE';

export const addIssue = (issue: IIssue): any => ({
  type: ADD_ISSUE,
  issue,
});

export const changeIssue = (issue: IIssue): any => ({
  type: CHANGE_ISSUE,
  issue,
});

export const deleteIssue = (issue: IIssue): any => ({
  type: DELETE_ISSUE,
  issue,
});
