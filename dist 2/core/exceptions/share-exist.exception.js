"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareExistException = void 0;
const common_1 = require("@nestjs/common");
class ShareExistException extends common_1.HttpException {
    constructor() {
        super('Share Exist', common_1.HttpStatus.CONFLICT);
    }
}
exports.ShareExistException = ShareExistException;
//# sourceMappingURL=share-exist.exception.js.map