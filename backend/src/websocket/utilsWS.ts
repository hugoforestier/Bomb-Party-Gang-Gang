import { wss } from '../index';

export function getConnectedUserIds(): number[] {
  const connected: number[] = [];

  for (const client of wss.clients) {
    if (client.info.authInfo == null)
      continue;
    connected.push(Number(client.info.authInfo.user.id));
  }

  return connected;
}
