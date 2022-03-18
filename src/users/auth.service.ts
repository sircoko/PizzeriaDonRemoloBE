import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { CredentialUserDto } from "./dtos/credentials-user.dto";

const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService {
  constructor(private usersSrv: UsersService) {}


  async signup(body: CreateUserDto){
    //Check unique email
    
    const existsUser = await this.usersSrv.findOneByEmail(body.email);
    console.log('ExistsUser with email: ' + body.email, existsUser)
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

  async signin(credentials: CredentialUserDto){
    const user = await this.usersSrv.findOneByEmail(credentials.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(credentials.password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }
    
    return user;


  }
}