import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';
import { isAwaitExpression } from 'typescript';
import { Server, Socket } from 'socket.io';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;
const server = http.createServer(app);
const io = new Server(server);

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
export const games = new Map();
const guid = (): string => {
  const s4 = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};
app.post('/', (req, res) => {
  const { master } = req.body;
  // const IDGame = guid();
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
    ]),
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
    console.log({ users: { members, observers, master }, messages });
    res.send({ users: { members, observers, master }, messages, issues });
  } else {
    res.send({ master: {}, members: [], observers: [], messages: [], issues: [] });
  }
});
/* app.post('/:id/observers', (req, res) => {
  const gameID = req.params.id;
  const { observer } = req.body;
  const observerID = guid();
  if (games.has(gameID)) {
    games.get(gameID).get('observers').set(observerID, observer);
    res.send([...games.get(gameID).get('observers')]);
  } else {
    res.send('check if the address is correct');
  }
});
app.post('/:id/members', (req, res) => {
  const gameID = req.params.id;
  const { member } = req.body;
  const memberID = guid();
  if (games.has(gameID)) {
    games.get(gameID).get('members').push(member);
    res.send(games.get(gameID).get('members'));
  } else {
    res.send('check if the address is correct');
  }
});
*/
io.on('connection', (socket: Socket) => {
  console.log('connect');
  socket.on('GAME_JOIN_MASTER', ({ gameID, master }) => {
    socket.join(gameID);
    socket.to(gameID).emit('MASTER_JOINED', master);
  });
  socket.on('GAME_JOIN_MEMBER', ({ gameID, user }) => {
    socket.join(gameID);
    games.get(gameID).get('members').set(socket.id, user);
    const members = [...games.get(gameID).get('members').values()];
    console.log([...games.get(gameID).get('members').values()]);
    const observers = [...games.get(gameID).get('observers').values()];
    const master = games.get(gameID).get('master');
    socket.to(gameID).emit('MEMBER_JOINED', { members, observers, master });
  });
  socket.on('GAME_JOIN_OBSERVER', ({ gameID, user }) => {
    socket.join(gameID);
    games.get(gameID).get('observers').set(socket.id, user);
    const members = [...games.get(gameID).get('members').values()];
    const observers = [...games.get(gameID).get('observers').values()];
    const master = games.get(gameID).get('master');
    socket.to(gameID).emit('MEMBER_JOINED', { members, observers, master });
  });
  socket.on('GAME_NEW_MESSAGE', ({ gameID, name, text, avatar }) => {
    console.log({ gameID, name, text, avatar })
    const message = {
      name,
      text,
      avatar,
    };
    games.get(gameID).get('messages').push(message);
    socket.to(gameID).emit('GAME_ADD_MESSAGE', message);
  });
  // issue
  socket.on('GAME_NEW_ISSUE', ({ gameID, title, link, priority, id }) => {
    console.log({ gameID, title, link, priority })
    const issue = {
      id,
      title,
      link,
      priority,
      
    };
    games.get(gameID).get('issues').push(issue);
   /* const members = [...games.get(gameID).get('members').values()];
    const observers = [...games.get(gameID).get('observers').values()];
    const master = games.get(gameID).get('master');*/
    console.log(games.get(gameID).get('issues'));
    socket.to(gameID).emit('GAME_ADD_ISSUE', issue);
  })
  socket.on('disconnect', () => {
    games.forEach((value, gameID) => {
      if (
        value.get('members').delete(socket.id) ||
        value.get('observers').delete(socket.id)
      ) {
        const members = [...games.get(gameID).get('members').values()];
        const observers = [...games.get(gameID).get('observers').values()];
        const master = games.get(gameID).get('master');
        socket.to(gameID).emit('MEMBER_LEAVED', { members, observers, master });
        console.log('delete');
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
