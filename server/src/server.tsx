import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

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

app.get('/', (req, res) => {
  res.send('server is up and running');
});
