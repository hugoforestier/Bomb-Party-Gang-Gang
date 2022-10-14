import { Session } from './session.model';
import { User } from './user.model';

export class AuthInfo {
  user: User;

  session: Session;

  constructor(user: User, session: Session) {
    this.session = session;
    this.user = user;
  }
}
