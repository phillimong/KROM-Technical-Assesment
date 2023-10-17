import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { ContactSchema } from 'src/contacts/contacts.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ContactsService } from 'src/contacts/contacts.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'contact', schema: ContactSchema }]),
  ],
  providers: [UsersService, ContactsService],
  controllers: [UsersController],
})
export class UsersModule {}
