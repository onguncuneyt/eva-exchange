import { Result } from './result.result';

export class ResultData<T> extends Result {
  data: T;

  constructor(status: boolean, message: string, code: number, data: T) {
    super(status, message, code);
    this.data = data;
  }
}
