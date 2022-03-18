import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor ( @InjectRepository(User) private userRepository: Repository<User>){}

  create(body: CreateUserDto){
    const user = this.userRepository.create(body);
    return this.userRepository.save(user);
  }

  findOne(id: number) {
    const user = this.userRepository.findOne(id);
    return user
  }

  async findOneByEmail(email: string){
    console.log('FindOneByEmail: ', email)
    const user = await this.userRepository.findOne({email});
    console.log('FoundByEmail: ', user)
    return user;
  }

  async find () {
    const users = await this.userRepository.find();
    return users;
  }

  async update(id: number, payload: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, payload);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException('User not found');
    }
    return this.userRepository.remove(user);
  }
}
