export class AuthResponseDto {
  access_token: string;
  user: {
    _id: string;
    email: string;
    username: string;
    name: string;
    date_of_birth?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  };
}
