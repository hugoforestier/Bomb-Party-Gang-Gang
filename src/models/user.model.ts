export class User {
  uuid: string;

  username: string;

  password?: string | null;

  salt?: string | null;

  constructor(
    uuid: string,
    username: string,
    password?: string | null,
    salt?: string | null,
  ) {
    this.uuid = uuid;
    this.username = username;
    this.password = password;
    this.salt = salt;
  }
}
