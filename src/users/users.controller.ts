import { Body, Controller, Post, NotFoundException, Get, Param, Patch, Delete, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { CredentialUserDto } from './dtos/credentials-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersSrv: UsersService,
              private authSrv: AuthService){}

  @Serialize(UserDto)
  @Get('/whoami')
  whoAmI(@Session() session: any) {
    console.log(session)
    return this.usersSrv.findOne(session.userId)
  }

  @Serialize(UserDto)
  @Post()
  async signupUser(@Body() body: CreateUserDto, @Session() session: any){
    const user = await this.authSrv.signup(body);
    session.userId = user.id;
    return user;
  }

  @Serialize(UserDto)
  @Post('/login')
  async login(@Body() credentials: CredentialUserDto, @Session() session: any) {
    const user = await this.authSrv.signin(credentials);
    session.userId = user.id;
    return user; 
  }

  @Post('/logout')
  signout(@Session() session: any){
    session = null;
    console.log(session)
  }


  @Serialize(UserDto)
  @Get()
  async findUsers(){
    return this.usersSrv.find();
  }

  @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string){
    const user = await this.usersSrv.findOne(parseInt(id));
    if(!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() payload: Partial<UpdateUserDto>) {
    return this.usersSrv.update(parseInt(id), payload);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string){
    return this.usersSrv.remove(parseInt(id))
  }
  
}
