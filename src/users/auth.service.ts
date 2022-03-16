import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from './users.service';


@Injectable()
export class AuthService {
  constructor(private usersSrv: UsersService) {}


  signup(body: CreateUserDto){
    //Check unique email
    const user = this.usersSrv.findOneByEmail(body.email);
    if(user) {
      throw new BadRequestException('Email is already used')
    }
    //Hash Password
      //Generate a salt
      
      //Hash password+salt
      //Join hashed result and salt together

    //Create User

    //Return User

  }

  signin(){

  }
}