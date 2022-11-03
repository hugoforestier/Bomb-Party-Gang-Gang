import WebSocket from 'ws';
import { AuthInfo } from '../models/authInfo.model';

export class ClientInfo {
  alive: boolean;

  authInfo: AuthInfo | null = null;

  constructor() {
    this.alive = true;
    this.authInfo = null;
  }
}

export type WebSocketClientInfo = WebSocket & { info: ClientInfo };
export type WebSocketServer = { clients: Set<WebSocketClientInfo> } & WebSocket.Server;
