import { Injectable } from '@nestjs/common';
import { ResultData } from '../results/result-data.result';
import { Result } from '../results/result.result';

@Injectable()
export class ResultHelper {
  created<T>(data: T): ResultData<T> {
    return new ResultData(true, 'Created', 201, data);
  }

  uptaded<T>(data: T): ResultData<T> {
    return new ResultData(true, 'Uptaded', 201, data);
  }

  ok() {
    return new Result(true, 'Ok', 200);
  }

  successData<T>(data: T): ResultData<T> {
    return new ResultData(true, 'Ok', 200, data);
  }
}
