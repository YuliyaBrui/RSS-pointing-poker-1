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
  const countMaster = 1;
  const countUsers = countMembers + countMaster;
  const countYes = games.get(gameID).get('kickForm').get('inform').yes.length;
  const countNo = games.get(gameID).get('kickForm').get('inform').no.length;
  const answers = countYes + countNo;
  if (countUsers === answers) {
    if (countYes >= Math.floor(0.5 * answers) + 1) {
      console.log(games.get(gameID).get('kickForm').get('inform'));
      const kickedUser = games.get(gameID).get('kickForm').get('inform').exclusion;
      console.log(kickedUser);
      if (
        games.get(gameID).get('members').delete(kickedUser.id) ||
        games.get(gameID).get('observers').delete(kickedUser.id)
      ) {
        const message = {
          text: `${kickedUser.name} ${kickedUser.name} is removed from the game`,
        
        };
        games.get(gameID).get('messages').push(message);
        console.log(`${games.get(gameID)}-kick member`);
        io.sockets.in(gameID).emit('KICKED_MEMBER', users(gameID));
        io.sockets.in(gameID).emit('STOP_JOIN', kickedUser.id);

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
