export class UserCreateResponseDto {
  constructor(id?: string, email?: string) {
    this.id = id;
    this.email = email;
  }
  id: string;
  email: string;
}
