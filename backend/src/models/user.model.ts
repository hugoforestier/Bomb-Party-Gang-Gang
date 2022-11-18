export interface User {
  id: bigint;

  username: string;

  uuid: string;

  password?: string;

  salt?: string;

  status?: boolean;
}
