import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from '../users/users.model';
import { ContactSchema } from 'src/contacts/contacts.model';

import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ContactsService } from 'src/contacts/contacts.service';
import { LocalStrategy } from './local.auth';

//enable dotenv
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'contact', schema: ContactSchema }]),
  ],
  providers: [UsersService, AuthService, LocalStrategy, ContactsService],
  controllers: [AuthController],
})
export class AuthModule {}
