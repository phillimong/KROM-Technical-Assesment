import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactSchema } from './contacts.model';
import { UserSchema } from 'src/users/users.model';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'contact', schema: ContactSchema }]),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService, UsersService],
})
export class ContactsModule {}
