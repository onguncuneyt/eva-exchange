import { HttpException, HttpStatus } from '@nestjs/common';

export class ShareExistException extends HttpException {
  constructor() {
    super('Share Exist', HttpStatus.CONFLICT);
  }
}
