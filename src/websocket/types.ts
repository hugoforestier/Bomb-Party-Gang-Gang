import WebSocket from 'ws';
import { AuthInfo } from '../models/authInfo.model';

export class ClientInfo {
  alive: boolean;

  authInfo: AuthInfo | null = null;

  ready: boolean;

  lives: number;

  constructor() {
    this.alive = true;
    this.authInfo = null;
    this.ready = false;
    this.lives = 2;
  }
}

export type WebSocketClientInfo = WebSocket & { info: ClientInfo };
export type WebSocketServer = { clients: Set<WebSocketClientInfo> } & WebSocket.Server;
