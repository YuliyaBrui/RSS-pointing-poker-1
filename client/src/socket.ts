import { io } from 'socket.io-client';

export const SERVER_URL = 'https://fierce-springs-66776.herokuapp.com';
export const CLIENT_URL = 'https://planning-poker-asyalu-yuliyabrui-anutaguzova.netlify.app';
export const socket = io(SERVER_URL, {
  transports: ['websocket'],
  upgrade: false,
  withCredentials: true,
});
