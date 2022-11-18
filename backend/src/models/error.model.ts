export default class RequestError implements Error {

  name =  'error';

  status: number;

  message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
