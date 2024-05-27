"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailExsitException = void 0;
const common_1 = require("@nestjs/common");
class EmailExsitException extends common_1.HttpException {
    constructor() {
        super('Email Exist', common_1.HttpStatus.CONFLICT);
    }
}
exports.EmailExsitException = EmailExsitException;
//# sourceMappingURL=email-exist.exception.js.map