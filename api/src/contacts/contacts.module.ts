import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './contacts.model';
import { UserSchema } from 'src/users/users.model';
import { AuthService } from 'src/auth/auth.service';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from 'src/auth/local.auth';
import { JwtStrategy } from 'src/auth/jwt.strategy';

//enable dotenv
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: 'contact', schema: ContactSchema }]),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  controllers: [ContactsController],
  providers: [
    ContactsService,
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class ContactsModule {}
