import axios from 'axios';
import { BASE_URL, JWT_LOCAL_STORAGE } from './keys';

const client = axios.create({
  baseURL: BASE_URL,
});

export function addAuthTokenToClient(token: string) {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  localStorage.setItem(JWT_LOCAL_STORAGE, token);
}

export function removeAuthTokenFromClient() {
  localStorage.removeItem(JWT_LOCAL_STORAGE);
  delete client.defaults.headers.common.Authorization;
}

const jwt = localStorage.getItem(JWT_LOCAL_STORAGE);
console.log(jwt);
if (jwt !== null) {
  addAuthTokenToClient(jwt);
}

export default client;
