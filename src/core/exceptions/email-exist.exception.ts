import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailExsitException extends HttpException {
  constructor() {
    super('Email Exist', HttpStatus.CONFLICT);
  }
}
