import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';
import { Contact } from 'src/contacts/contacts.model';
import { ContactsService } from 'src/contacts/contacts.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
    private readonly contactsService: ContactsService,
  ) {}
  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    return this.userModel.create({
      username,
      password,
      email,
    });
  }
  async getUser(query: object): Promise<User> {
    return this.userModel.findOne(query);
  }
  async getUserContacts(query: object): Promise<Contact[]> {
    return await this.userModel.findOne(query).populate('contacts');
  }

  async addContactToUser(contactId: object): Promise<any> {
    const contact = await this.contactsService.getContactById(contactId);
    const user = contact.user;
    const userContact = await this.userModel.findById(user);
    userContact.contacts.push(contact);
    return await userContact.save();
  }
}
