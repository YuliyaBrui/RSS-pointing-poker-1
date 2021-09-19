export interface IIssue {
  title: string;
  link: string;
  priority: string;
  id: string;
}
export interface IIssueState {
  issues: IIssue[];
}
export enum IssueActionTypes {
  'ADD_ISSUE' = 'ADD_ISSUE',
  'CHANGE_ISSUE' = 'CHANGE_ISSUE',
  'DELETE_ISSUE' = 'DELETE_ISSUE',
}
export interface IFetchAddIssueAction {
  type: IssueActionTypes.ADD_ISSUE;
  payload: {
    issue: IIssue;
  };
}
