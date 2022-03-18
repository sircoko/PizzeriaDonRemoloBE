import { Expose } from "class-transformer";


export class UserDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  name: string;

  @Expose()
  lastname: string;

  @Expose()
  email: string;
}