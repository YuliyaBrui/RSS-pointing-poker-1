import { KICK_FORM } from '../actions/kickForm';

const initialState = {
  visibil: false,
  initiator: { name: '', lastName: '' },
  exclusion: { name: '', lastName: '' },
  yes: [],
  no: [],
};

export const kickForm = (state = initialState, action: any): any => {
  switch (action.type) {
    case KICK_FORM:
      return action.kickData;
    default:
      return state;
  }
};
