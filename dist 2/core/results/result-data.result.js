"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultData = void 0;
const result_result_1 = require("./result.result");
class ResultData extends result_result_1.Result {
    constructor(status, message, code, data) {
        super(status, message, code);
        this.data = data;
    }
}
exports.ResultData = ResultData;
//# sourceMappingURL=result-data.result.js.map