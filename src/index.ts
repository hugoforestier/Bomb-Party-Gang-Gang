import './pre-start';
import app from './server';
import logger from './shared/Logger';
import { Server as WsServer } from 'ws';
import { WebSocketServer } from './websocket/types';

// Start the server
const port = Number(process.env.PORT || 8080);
const server = app.listen(port, () => {
  logger.info('Express server started on port: ' + port);
});

export const wss: WebSocketServer = new WsServer({
  noServer: true,
}) as WebSocketServer;

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, socket2 => {
    console.log(socket2);
    wss.emit('connection', socket, request);
  });
});


