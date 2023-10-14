import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';
import { User } from './users.model';

//import dotenv
import * as dotenv from 'dotenv';

//enable dotenv
dotenv.config();

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('username') email: string,
  ): Promise<User> {
    const saltOrRounds = process.env.SALT || 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    try {
      const result = await this.usersService.createUser(
        username,
        hashedPassword,
        email,
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
