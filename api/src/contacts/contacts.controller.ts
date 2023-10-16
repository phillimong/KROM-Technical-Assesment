import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import * as bcrypt from 'bcrypt';

import { Contact } from './contacts.model';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}
  @Post('new')
  async createContact(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('message') message: string,
  ): Promise<Contact> {
    const encryptedname = await this.contactsService.encrypt(name);
    const encryptedemail = await this.contactsService.encrypt(email);
    const encryptedphone = await this.contactsService.encrypt(phone);
    const encryptedmessage = await this.contactsService.encrypt(message);
    return await this.contactsService.createContact(
      encryptedname,
      encryptedemail,
      encryptedphone,
      encryptedmessage,
    );
  }
}
