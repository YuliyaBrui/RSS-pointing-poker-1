import http from 'http';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';
import { Server, Socket } from 'socket.io';
import { ISetting } from './types';
import { kickVoiting, sortASC, sortDESC, users } from './functions';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
const server = http.createServer(app);
export const io = new Server(server);

/* const wss = new WebSocket.Server({ server });
const start = async (): Promise<void> => {
  try {
    await mongoose.connect(
      'mongodb+srv://poker:poker123@cluster0.tp4kc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );

    wss.on('connection', (ws: WebSocket) => {
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
      });
      ws.send('Hi there, I am a WebSocket server');
    });
  } catch (e: any) {
    console.log('Server Error', e.message);
  }
};

start();
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// random id
const guid = (): string => {
  const s4 = (): string => Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};

export const games = new Map();

app.post('/', (req, res) => {
  const { master } = req.body;
  const gameID = guid();
  console.log(gameID, 'post');
  games.set(
    gameID,
    new Map([
      ['master', master],
      ['members', new Map()],
      ['observers', new Map()],
      ['messages', []],
      ['issues', new Map()],
      ['issuesCopy', new Map()],
      ['setting', {}],
      ['gameCards', []],
      ['kickForm', new Map()],
      ['gameScore', new Map()],
      ['percentScore', new Map()],
      // [
      //   'finalScore',
      //   {
      //     0: { 1: 53, 3: 23, 0: 33 },
      //     1: { 1: 53, 3: 23 },
      //   },
      // ],
      ['finalScore', []],
      ['sessionName', 'New session'],
    ]),
  );
  res.json(gameID);
  console.log(games.keys());
});

app.get('/session-name/:id', async (req, res) => {
  res.send(games.get(req.params.id).get('sessionName'));
});

app.get('/result/:id', async (req, res) => {
  res.send(games.get(req.params.id).get('finalScore'));
});

app.get('/:id', async (req, res) => {
  const gameID = req.params.id;
  console.log(gameID, 'get');
  if (games.has(gameID)) {
    const members = [...games.get(gameID).get('members').values()];
    const observers = [...games.get(gameID).get('observers').values()];
    const master = games.get(gameID).get('master');
    const messages = games.get(gameID).get('messages');
    const issues = [...games.get(gameID).get('issues').values()];
    const setting = games.get(gameID).get('setting');
    const gameCards = games.get(gameID).get('gameCards');
    const kickForm = games.get(gameID).get('kickForm');
    const gameScore = [...games.get(gameID).get('gameScore').values()];
    const percentScore = [...games.get(gameID).get('percentScore').values()];
    const sessionName = games.get(gameID).get('sessionName');
    const finalScore = games.get(gameID).get('finalScore');

    res.send({
      users: { members, observers, master },
      messages,
      issues,
      setting,
      gameCards,
      kickForm,
      gameScore,
      percentScore,
      sessionName,
      finalScore,
    });
  } else {
    res.send({
      users: {
        master: {
          name: '',
          lastName: '',
          jobPosition: '',
          avatarURL: '',
          id: '',
        },
        members: [],
        observers: [],
      },
      messages: [],
      issues: [],
      setting: {
        masterPlayer: false,
        changingCard: false,
        needTimer: false,
        scoreType: '',
        shortScoreType: 'ST',
        roundTime: 0,
      },
      gameCards: [],
      kickForm: [],
      gameScore: [],
      sessionName: '',
    });
  }
});

io.on('connection', (socket: Socket) => {
  console.log(`${socket.id} connected`);
  socket.send('connection', socket.id);
  socket.on('GAME_JOIN_MASTER', ({ gameID, master }) => {
    socket.join(gameID);
    games.get(gameID).delete('master');
    games.get(gameID).set('master', master);
    console.log('GAME_JOIN_MASTER');
    socket.to(gameID).emit('MASTER_JOINED', master);
  });

  socket.on('GAME_JOIN_MEMBER', ({ gameID, user }) => {
    socket.join(gameID);
    games.get(gameID).get('members').set(socket.id, user);
    console.log('GAME_JOIN_MEMBER');
    socket.to(gameID).emit('MEMBER_JOINED', users(gameID));
  });

  socket.on('GAME_JOIN_OBSERVER', ({ gameID, user }) => {
    socket.join(gameID);
    games.get(gameID).get('observers').set(socket.id, user);
    console.log('GAME_JOIN_OBSERVER');
    socket.to(gameID).emit('MEMBER_JOINED', users(gameID));
  });

  socket.on('GAME_NEW_MESSAGE', ({
 gameID, name, lastName, text, avatar 
}) => {
    const message = {
      name,
      lastName,
      text,
      avatar,
    };
    games.get(gameID).get('messages').push(message);
    console.log('GAME_NEW_MESSAGE');
    io.sockets.in(gameID).emit('GAME_ADD_MESSAGE', games.get(gameID).get('messages'));
  });

  // issue
  socket.on('GAME_NEW_ISSUE', ({
 gameID, title, link, priority, id, }) => {
    const issue = {
      id,
      title,
      link,
      priority,
    };
    games.get(gameID).get('issues').set(`${id}`, issue);
    games.get(gameID).get('issuesCopy').set(`${id}`, issue);
    console.log(`issues-copy-${games.get(gameID).get('issuesCopy')}`);
    io.sockets.in(gameID).emit('GAME_ADD_ISSUE', [...games.get(gameID).get('issues').values()]);
  });
  socket.on('SORT_ISSUES_ASC', (gameID) => {
    const issues = [...games.get(gameID).get('issues').values()].slice().sort(sortASC('priority'));
    games.get(gameID).get('issues').clear();
    issues.map((elem) => games.get(gameID).get('issues').set(elem.id, elem));
    console.log(`${games.get(gameID).get('issues')}-asc`);
    io.sockets.in(gameID).emit('GAME_SORT_ISSUES', [...games.get(gameID).get('issues').values()]);
  });
  socket.on('SORT_ISSUES_DESC', (gameID) => {
    const issues = [...games.get(gameID).get('issues').values()].slice().sort(sortDESC('priority'));
    games.get(gameID).get('issues').clear();
    issues.map((elem) => games.get(gameID).get('issues').set(elem.id, elem));
    console.log(`${games.get(gameID).get('issues')}-desc`);
    io.sockets.in(gameID).emit('GAME_SORT_ISSUES', [...games.get(gameID).get('issues').values()]);
  });
  socket.on('FIRST_ORDER_ISSUES', (gameID) => {
    const issues = [...games.get(gameID).get('issuesCopy').values()];
    games.get(gameID).get('issues').clear();
    issues.map((elem) => games.get(gameID).get('issues').set(elem.id, elem));
    console.log(`${games.get(gameID).get('issues')}-first order`);
    io.sockets.in(gameID).emit('GAME_SORT_ISSUES', [...games.get(gameID).get('issues').values()]);
  });
  socket.on('GAME_DELETE_ISSUE', ({ gameID, id }) => {
    games.get(gameID).get('issues').delete(id);
    console.log(`${games.get(gameID).get('issues')}-delete issue`);
    socket.to(gameID).emit('GAME_DELETE_ISSUE', games.get(gameID).get('issues'));
  });

  socket.on('GAME_CHANGE_ISSUE', ({ gameID, id, title }) => {
    games.get(gameID).get('issues').get(id).title = title;
    console.log(`${games.get(gameID).get('issues')}-change issue`);
    socket.to(gameID).emit('GAME_CHANGE_ISSUE', games.get(gameID).get('issues'));
  });

  socket.on('START_GAME', (gameID, address) => {
    console.log(`${address}-START_GAME`);
    socket.to(gameID).emit('START_GAME', address);
  });
  socket.on('GAME_RESULTS', (gameID, address) => {
    io.sockets.in(gameID).emit('GAME_RESULTS', address);
  });
  socket.on(
    'ADD_GAME_SETTING',
    (
      gameID,
      { masterPlayer, changingCard, needTimer, scoreType, shortScoreType, roundTime 
}: ISetting,
    ) => {
      games.get(gameID).delete('setting');
      games.get(gameID).set('setting', {
        masterPlayer,
        changingCard,
        needTimer,
        scoreType,
        shortScoreType,
        roundTime,
      });
      console.log(`${games.get(gameID).get('setting')}-added setting`);
      io.sockets.in(gameID).emit('ADDED_GAME_SETTING', games.get(gameID).get('setting'));
    },
  );
  socket.on('SET_SESSION_NAME', (gameID, sessionName) => {
    games.get(gameID).set('sessionName', sessionName);
    console.log(sessionName);
    io.sockets.in(gameID).emit('GET_SESSION_NAME', sessionName);
  });

  socket.on('ADD_GAME_CARDS', (gameID, [...gameCards]) => {
    games
      .get(gameID)
      .get('gameCards')
      .push(...gameCards);
    console.log(games.get(gameID).get('gameCards'));
    io.sockets.in(gameID).emit('ADDED_GAME_CARDS', games.get(gameID).get('gameCards'));
  });

  socket.on('KICK_DATA', (gameID, kickData) => {
    games.get(gameID).get('kickForm').set('inform', kickData);
    console.log(`${games.get(gameID).get('kickForm').get('inform')}-KICK_DATA`);
    const master = games.get(gameID).get('master');
    io.to(master.id).emit('KICK_DATA', kickData);
    const members = [...games.get(gameID).get('members').keys()];
    members.forEach((el) => {
      io.to(el).emit('KICK_DATA', kickData);
    });

    //  io.sockets.in(gameID).emit('KICK_DATA', kickData);
  });

  socket.on('KICK_USER_BY_MASTER', (gameID, id) => {
    if (
      games.get(gameID).get('members').delete(id)
      || games.get(gameID).get('observers').delete(id)
    ) {
      console.log('KICK_USER_BY_MASTER');
      io.sockets.in(gameID).emit('KICKED_MEMBER', users(gameID));
      io.sockets.in(gameID).emit('STOP_JOIN', id);
    }
  });
  socket.on('USER_EXIT', (gameID, id) => {
    if (
      games.get(gameID).get('members').delete(id)
      || games.get(gameID).get('observers').delete(id)
    ) {
      console.log('USER_EXIT');
      io.sockets.in(gameID).emit('USER_EXIT', users(gameID));
      io.sockets.in(gameID).emit('STOP_JOIN', id);
    }
  });
  socket.on('AGREE_KICK_MEMBER', (gameID, id) => {
    games.get(gameID).get('kickForm').get('inform').yes.push(id);
    console.log('yes-kick');
    kickVoiting(gameID);
  });

  socket.on('DISAGREE_KICK_MEMBER', (gameID, id) => {
    games.get(gameID).get('kickForm').get('inform').no.push(id);
    console.log('no-kick');
    kickVoiting(gameID);
  });

  socket.on('GET_GAME_CARDS', (gameID) => {
    io.sockets.in(gameID).emit('GET_GAME_CARDS', games.get(gameID).get('gameCards'));
  });

  socket.on('SET_USER_POINT', (gameID, scoreData) => {
    games.get(gameID).get('gameScore').set(`${scoreData.name}${scoreData.lastName}`, scoreData);
    games.get(gameID).get('percentScore').set(`${scoreData.name}${scoreData.lastName}`, scoreData);
    const allUserPoints = [...games.get(gameID).get('gameScore').values()];
    io.sockets.in(gameID).emit('GET_USER_POINT', allUserPoints);
  });

  socket.on('GET_AVERAGE_RESULT', (gameID) => {
    const arrUserPoints = [...games.get(gameID).get('gameScore').values()];
    console.log(`${arrUserPoints}-GET_AVERAGE_RESULT`);
    const oneIssueStats = {
      quantity: arrUserPoints.length,
      average: 0,
      coffee: 0,
    };

    arrUserPoints.forEach((el): void => {
      const { point } = el;
      if (point !== 0) {
        oneIssueStats.average += point;
      } else {
        oneIssueStats.coffee += 1;
      }
    });

    oneIssueStats.average /= arrUserPoints.length - oneIssueStats.coffee;
    oneIssueStats.average = +oneIssueStats.average.toFixed(2);

    io.sockets.in(gameID).emit('GET_AVERAGE_RESULT', oneIssueStats);
  });

  const getVotingResult = (gameID: string): void => {
    const arrUserPoints = [...games.get(gameID).get('gameScore').values()];
    interface TPercent extends Object {
      [point: number]: number;
    }
    const percent: TPercent = {};

    interface TStatistics extends Object {
      [point: number]: number[];
    }
    const statistics: TStatistics = {};

    arrUserPoints.forEach((el): void => {
      const { point } = el;
      if (point in statistics) {
        statistics[point].push(point);
      } else {
        statistics[point] = [];
        statistics[point].push(point);
      }
    });

    for (const value in statistics) {
      percent[value] = +((statistics[value].length / arrUserPoints.length) * 100).toFixed(1);
    }

    games.get(gameID).get('finalScore').push(percent);
  };

  socket.on('NEXT_ISSUE', (gameID) => {
    getVotingResult(gameID);
    games.get(gameID).get('gameScore').clear();
    io.sockets.in(gameID).emit('GET_USER_POINT', []);
  });

  socket.on('END_VOTING', (gameID) => {
    getVotingResult(gameID);
    io.sockets.in(gameID).emit('END_VOTING', []);
  });

  socket.on('REPEAT_VOTING', (gameID) => {
    games.get(gameID).get('gameScore').clear();
    io.sockets.in(gameID).emit('GET_USER_POINT', []);
  });

  socket.on('RESET_VISIBIL_CARD', (gameID) => {
    io.sockets.in(gameID).emit('RESET_VISIBIL_CARD', -1);
  });

  socket.on('ROUND_RUN', (gameID) => {
    io.sockets.in(gameID).emit('ROUND_RUN');
  });

  socket.on('NEXT_CURRENT_ISSUE', (gameID, value) => {
    io.sockets.in(gameID).emit('NEXT_CURRENT_ISSUE', value);
  });

  socket.on('VIEW_GAME_SCORE', (gameID, value) => {
    io.sockets.in(gameID).emit('VIEW_GAME_SCORE', value);
  });

  socket.on('RESET_TIME', (gameID) => {
    io.sockets.in(gameID).emit('RESET_TIME');
  });
  socket.on('GAME_DELETE', (gameID, address) => {
    games.get(gameID).get('observers').clear();
    games.get(gameID).get('members').clear();
    console.log( [...games.get(gameID).get('members').values()]);
    socket.to(gameID).emit('GAME_DELETED', address);
  
   
    setTimeout(() => {
      games.delete(gameID);
      console.log([...games.values()]);
      console.log('delete-master');
    }, 3000);
  });
  socket.on('disconnect', () => {
    games.forEach((value, gameID) => {
      if (value.get('members').delete(socket.id) || value.get('observers').delete(socket.id)) {
        socket.to(gameID).emit('MEMBER_LEAVED', users(gameID));
        console.log('delete');
      }
      if (value.get('master').id === socket.id) {
        setTimeout(() => {
          if (!games.get(gameID).get('master').id) {
            games.delete(gameID);
            console.log([...games.values()]);
            console.log('delete-master');
            socket.to(gameID).emit('MASTER_LEAVED', gameID);
          }
        }, 20000);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
