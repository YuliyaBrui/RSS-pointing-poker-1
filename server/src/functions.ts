import { games, io } from './server';

export const users = (gameID: string): any => {
  const members = [...games.get(gameID).get('members').values()];
  const observers = [...games.get(gameID).get('observers').values()];
  const master = games.get(gameID).get('master');
  return { members, observers, master };
};
interface IIssue {
  id: string;
  title: string;
  link: string;
  priority: string;
}
const arrPriority = ['low', 'middle', 'high'];
export function sortASC(field: keyof IIssue): any {
  return (a: IIssue, b: IIssue): any => {
    if (arrPriority.indexOf(a[field]) > arrPriority.indexOf(b[field])) {
      return 1;
    }
    return -1;
  };
}
export function sortDESC(field: keyof IIssue): any {
  return (a: IIssue, b: IIssue): any => {
    if (arrPriority.indexOf(a[field]) < arrPriority.indexOf(b[field])) {
      return 1;
    }
    return -1;
  };
}
export const kickVoiting = (gameID: string): void => {
  const countMembers = [...games.get(gameID).get('members').values()].length;
  const countObservers = [...games.get(gameID).get('observers').values()].length;
  const countMaster = 1;
  const countUsers = countMembers + countObservers + countMaster;
  const countYes = games.get(gameID).get('kickForm').get('inform').yes.length;
  const countNo = games.get(gameID).get('kickForm').get('inform').no.length;
  const answers = countYes + countNo;
  if (countUsers === answers) {
    if (countYes >= Math.floor(0.5 * answers) + 1) {
      console.log(games.get(gameID).get('kickForm').get('inform'));
      const kickedUser = games.get(gameID).get('kickForm').get('inform').exclusion.id;
      console.log(kickedUser);
      if (
        games.get(gameID).get('members').delete(kickedUser) ||
        games.get(gameID).get('observers').delete(kickedUser)
      ) {
        console.log(games.get(gameID));
        io.sockets.in(gameID).emit('KICKED_MEMBER', users(gameID));
        io.sockets.in(gameID).emit('STOP_JOIN', kickedUser);
      } else {
        io.sockets.in(gameID).emit('STAY_MEMBER', users(gameID));
      }
    }
    games.get(gameID).get('kickForm').delete('inform');
    console.log(games.get(gameID).get('kickForm'));
    io.sockets.in(gameID).emit('FINISH_VOITING', {
      visibil: false,
      initiator: {},
      exclusion: {},
      yes: [],
      no: [],
    });
  }
};
