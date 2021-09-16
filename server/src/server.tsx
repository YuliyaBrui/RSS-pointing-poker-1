import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(
      'mongodb+srv://poker:poker123@cluster0.tp4kc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions,
    );

    wss.on('connection', (ws: WebSocket) => {
      ws.on('message', (message: string) => {
        console.log(JSON.parse(message));
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
      });
      ws.send('Hi there, I am a WebSocket server');
    });
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e: any) {
    console.log('Server Error', e.message);
  }
};

start();

app.use(express.json());
const games = new Map();

const guid = (): string => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};
app.post('/', (req, res) => {
  const { master } = req.body;
  const IDGame = '1111';
  games.set(
    IDGame,
    new Map([
      ['members', new Map()],
      ['observers', new Map()],
      ['master', master],
    ]),
  );
  res.send();
});
app.get('/', async (req, res) => {
  res.send(games.get('1111').get('master'));
  console.log(games.get('1111').get('master'));
});
