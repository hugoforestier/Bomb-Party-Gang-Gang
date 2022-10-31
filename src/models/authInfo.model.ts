import { User } from './user.model';

export class AuthInfo {
  user: User;

  roomName?: string;

  constructor(user: User) {
    this.user = user;
  }

  
}
