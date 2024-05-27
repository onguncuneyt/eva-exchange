"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultHelper = void 0;
const common_1 = require("@nestjs/common");
const result_data_result_1 = require("../results/result-data.result");
const result_result_1 = require("../results/result.result");
let ResultHelper = class ResultHelper {
    created(data) {
        return new result_data_result_1.ResultData(true, 'Created', 201, data);
    }
    ok() {
        return new result_result_1.Result(true, 'Ok', 200);
    }
    successData(data) {
        return new result_data_result_1.ResultData(true, 'Ok', 200, data);
    }
};
exports.ResultHelper = ResultHelper;
exports.ResultHelper = ResultHelper = __decorate([
    (0, common_1.Injectable)()
], ResultHelper);
//# sourceMappingURL=result-helper.util.js.map