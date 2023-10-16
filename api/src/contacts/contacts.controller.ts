import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

import { Contact } from './contacts.model';

@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly usersService: UsersService,
  ) {}
  @Post('new')
  async createContact(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('message') message: string,
    @Body('userId') userId: string,
    //get userId from params
  ): Promise<Contact> {
    const encryptedname = await this.contactsService.encrypt(name);
    const encryptedemail = await this.contactsService.encrypt(email);
    const encryptedphone = await this.contactsService.encrypt(phone);
    const encryptedmessage = await this.contactsService.encrypt(message);
    const user = await this.usersService.getUser({ _id: userId });
    return await this.contactsService.createContact(
      encryptedname,
      encryptedemail,
      encryptedphone,
      encryptedmessage,
      user,
    );
  }
  @Get('find')
  async getContactById(
    @Body('id') id: string,
    @Body('user') user: string,
  ): Promise<Contact> {
    return await this.contactsService.decrypt(id, user);
  }

  @Get('user')
  async getUserContacts(@Body('id') id: string): Promise<Contact[]> {
    const contacts = await this.usersService.getUserContacts({ _id: id });
    return contacts;
  }
}
