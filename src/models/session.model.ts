export class Session {
  fk_user_id: bigint;

  session_id: bigint;

  params: any;

  constructor(fk_user_id: bigint, session_id: bigint,  params: any) {
    this.fk_user_id = fk_user_id;
    this.session_id = session_id;
    this.params = params;
  }
}
