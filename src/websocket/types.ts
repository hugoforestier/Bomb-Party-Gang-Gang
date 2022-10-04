import WebSocket from 'ws';

export class ClientInfo {
  alive: boolean;

  constructor() {
    this.alive = true;
  }
}

export type WebSocketClientInfo = WebSocket & { info: ClientInfo };
export type WebSocketServer = { clients: Set<WebSocketClientInfo> } & WebSocket.Server;
