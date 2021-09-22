import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';
import { isAwaitExpression } from 'typescript';
import { Server, Socket } from 'socket.io';
import { ISetting } from './types';
import { kickVoiting, users } from './functions';

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
  const s4 = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};

export const games = new Map();

app.post('/', (req, res) => {
  const { master } = req.body;
  const gameID = '1111';
  games.set(
    gameID,
    new Map([
      ['master', master],
      ['members', new Map()],
      ['observers', new Map()],
      ['messages', []],
      ['issues', []],
      ['setting', []],
      ['gameCards', []],
      ['kickForm', new Map()],
    ])
  );
  res.json(gameID);
});
app.get('/:id', async (req, res) => {
  const gameID = req.params.id;
  if (games.has(gameID)) {
    const members = [...games.get(gameID).get('members').values()];
    const observers = [...games.get(gameID).get('observers').values()];
    const master = games.get(gameID).get('master');
    const messages = games.get(gameID).get('messages');
    const issues = games.get(gameID).get('issues');
    const setting = games.get(gameID).get('setting');
    const gameCards = games.get(gameID).get('gameCards');
    const kickForm = games.get(gameID).get('kickForm');

    res.send({
      users: { members, observers, master },
      messages,
      issues,
      setting,
      gameCards,
      kickForm,
    });
  } else {
    res.send({
      master: {},
      members: [],
      observers: [],
      messages: [],
      issues: [],
      setting: [],
      gameCards: [],
      kickForm: [],
    });
  }
});

io.on('connection', (socket: Socket) => {
  console.log(`${socket.id} connected`);
  socket.send('connection', socket.id);
  socket.on('GAME_JOIN_MASTER', ({ gameID, master }) => {
    socket.join(gameID);
    console.log(master);
    socket.to(gameID).emit('MASTER_JOINED', master);
  });

  socket.on('GAME_JOIN_MEMBER', ({ gameID, user }) => {
    socket.join(gameID);
    games.get(gameID).get('members').set(socket.id, user);
    socket.to(gameID).emit('MEMBER_JOINED', users(gameID));
  });

  socket.on('GAME_JOIN_OBSERVER', ({ gameID, user }) => {
    socket.join(gameID);
    games.get(gameID).get('observers').set(socket.id, user);
    socket.to(gameID).emit('MEMBER_JOINED', users(gameID));
  });

  socket.on('GAME_NEW_MESSAGE', ({ gameID, name, lastName, text, avatar }) => {
    console.log({ gameID, name, text, avatar });
    const message = {
      name,
      lastName,
      text,
      avatar,
    };
    games.get(gameID).get('messages').push(message);
    socket.to(gameID).emit('GAME_ADD_MESSAGE', message);
  });

  // issue
  socket.on('GAME_NEW_ISSUE', ({ gameID, title, link, priority, id }) => {
    console.log({ gameID, title, link, priority });
    const issue = {
      id,
      title,
      link,
      priority,
    };
    games.get(gameID).get('issues').push(issue);
    console.log(games.get(gameID).get('issues'));
    socket.to(gameID).emit('GAME_ADD_ISSUE', issue);
  });

  socket.on('GAME_DELETE_ISSUE', (gameID, id) => {
    console.log(gameID, id);
    games.get(gameID).get('issues').splice(id, 1);
    console.log(games.get(gameID).get('issues'));
    socket.to(gameID).emit('GAME_DELETE_ISSUE', users(gameID));
  });

  socket.on('START_GAME', (gameID, address) => {
    socket.to(gameID).emit('START_GAME', address);
  });

  socket.on(
    'ADD_GAME_SETTING',
    (
      gameID,
      {
        masterPlayer,
        changingCard,
        needTimer,
        scoreType,
        shortScoreType,
        roundTime,
      }: ISetting
    ) => {
      games.get(gameID).get('setting').push({
        masterPlayer,
        changingCard,
        needTimer,
        scoreType,
        shortScoreType,
        roundTime,
      });
    }
  );

  socket.on('ADD_GAME_CARDS', (gameID, [...gameCards]) => {
    games
      .get(gameID)
      .get('gameCards')
      .push(...gameCards);
  });

  socket.on('KICK_DATA', (gameID, kickData) => {
    // games.get(gameID).get('kickForm').push(kickData);
    games.get(gameID).get('kickForm').set('inform', kickData);
    console.log(games.get(gameID).get('kickForm').get('inform'));
    io.sockets.in(gameID).emit('KICK_DATA', kickData);
  });
  socket.on('KICK_USER_BY_MASTER', (gameID, id) => {
    if (
      games.get(gameID).get('members').delete(id) ||
      games.get(gameID).get('observers').delete(id)
    ) {
      console.log(games.get(gameID));
      io.sockets.in(gameID).emit('KICKED_MEMBER', users(gameID));
      io.sockets.in(gameID).emit('STOP_JOIN', id);
    }
  });
  socket.on('AGREE_KICK_MEMBER', (gameID, id) => {
    games.get(gameID).get('kickForm').get('inform').yes.push(id);
    console.log('yes')
    kickVoiting(gameID);
    console.log('delete');
  });

  socket.on('DISAGREE_KICK_MEMBER', (gameID, id) => {
    games.get(gameID).get('kickForm').get('inform').no.push(id);
    console.log('no')
    kickVoiting(gameID);
  });
  socket.on('disconnect', () => {
    games.forEach((value, gameID) => {
      if (
        value.get('members').delete(socket.id) ||
        value.get('observers').delete(socket.id)
      ) {
        socket.to(gameID).emit('MEMBER_LEAVED', users(gameID));
        console.log('delete');
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
