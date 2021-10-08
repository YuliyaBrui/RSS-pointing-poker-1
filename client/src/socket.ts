import { io } from 'socket.io-client';

export const SERVER_URL = 'http://localhost:3002';
export const CLIENT_URL = 'http://localhost:3000';
export const socket = io(SERVER_URL, { transports: ['websocket'], upgrade: false });
