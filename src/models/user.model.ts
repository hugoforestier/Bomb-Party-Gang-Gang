export class User {
  id: bigint;

  username: string;

  uuid: string;

  password?: string | null;

  salt?: string | null;

  constructor(
    id: bigint,
    username: string,
    uuid: string,
    password?: string | null,
    salt?: string | null,
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.salt = salt;
    this.uuid = uuid;
  }
}
