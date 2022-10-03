import { Axios } from 'axios';
import { BASE_URL } from './keys';

const client = new Axios({
  baseURL: BASE_URL,
});

export function addAuthTokenToClient(token: string) {
  client.defaults.headers.common.Auth = `Bearer ${token}`;
}

export function removeAuthTokenFromClient() {
  delete client.defaults.headers.common.Auth;
}

export default client;
