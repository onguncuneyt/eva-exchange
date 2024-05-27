export class UserLoginResponseDto {
  constructor(token?: string) {
    this.token = token;
  }
  token: string;
}
