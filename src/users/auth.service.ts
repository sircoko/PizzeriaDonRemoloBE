import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService {
  constructor(private usersSrv: UsersService) {}


  async signup(body: CreateUserDto){
    //Check unique email
    const existsUser = this.usersSrv.findOneByEmail(body.email);
    if(existsUser) {
      throw new BadRequestException('Email is already used')
    }
    //Hash Password
      //Generate a salt
    const salt = randomBytes(8).toString('hex');
      
      //Hash password+salt
    const hash = (await scrypt(body.password, salt, 32)) as Buffer; 

      //Join hashed result and salt together
    const result = salt + '.' +hash.toString('hex');

    //Create User
    body.password = result;
    const user = await this.usersSrv.create(body);

    //Return User
    return user;

  }

  signin(){

  }
}