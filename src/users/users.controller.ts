import { Body, Controller, Post, NotFoundException, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersSrv: UsersService,
              private authSrv: AuthService){}

  @Post()
  async signupUser(@Body() body: CreateUserDto){
    const user = await this.authSrv.signup(body);
    return user;
  }

  @Get()
  async findUsers(){
    return this.usersSrv.find();
  }

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
