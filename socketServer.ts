import * as Http from 'http';
import socketio, { Server } from 'socket.io';

// Create new socket server
const io: Server = socketio();

// Export function to attach HTTP server
export const SocketServer = (server: Http.Server) => {
  io.listen(server);
}