import { ResultData } from '../results/result-data.result';
import { Result } from '../results/result.result';
export declare class ResultHelper {
    created<T>(data: T): ResultData<T>;
    ok(): Result;
    successData<T>(data: T): ResultData<T>;
}
