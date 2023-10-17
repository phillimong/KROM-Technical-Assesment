import { Body, Controller, UseGuards, Post, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactsService } from './contacts.service';
import { UsersService } from 'src/users/users.service';

import { Contact } from './contacts.model';

@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly usersService: UsersService,
  ) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('new')
  async createContact(
    @Query('id') userId: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone') phone: string,
    @Body('message') message: string,
  ): Promise<Contact> {
    const encryptedname = await this.contactsService.encrypt(name);
    const encryptedemail = await this.contactsService.encrypt(email);
    const encryptedphone = await this.contactsService.encrypt(phone);
    const encryptedmessage = await this.contactsService.encrypt(message);
    const user = await this.usersService.getUser({ _id: userId });
    //Buffer to string
    const contact = await this.contactsService.createContact(
      encryptedname,
      encryptedemail,
      encryptedphone,
      encryptedmessage,
      user,
    );
    return await this.usersService.addContactToUser(contact._id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('find')
  async getContactById(@Query('id') id: string): Promise<Object> {
    const contact = await this.contactsService.getContactById(id);
    console.log(contact);
    const decryptedname = await this.contactsService.decrypt(contact.name);
    const decryptedemail = await this.contactsService.decrypt(contact.email);
    const decryptedphone = await this.contactsService.decrypt(contact.phone);
    const decryptedmessage = await this.contactsService.decrypt(
      contact.message,
    );

    return {
      _id: contact._id,
      name: decryptedname,
      email: decryptedemail,
      phone: decryptedphone,
      message: decryptedmessage,
      user: contact.user,
    };
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async getUserContacts(@Body('id') id: string): Promise<Contact[]> {
    const contacts = await this.usersService.getUserContacts({ _id: id });
    return contacts;
  }
}
