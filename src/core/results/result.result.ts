export class Result {
  status: boolean;
  message: string;
  code: number;

  constructor(status: boolean, message: string, code: number) {
    this.status = status;
    this.message = message;
    this.code = code;
  }
}
