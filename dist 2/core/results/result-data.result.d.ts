import { Result } from './result.result';
export declare class ResultData<T> extends Result {
    data: T;
    constructor(status: boolean, message: string, code: number, data: T);
}
