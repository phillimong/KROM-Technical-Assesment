import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './contacts.model';
import * as crypto from 'crypto';
import { User } from 'src/users/users.model';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('contact') private contactModel: Model<ContactDocument>,
  ) {}
  private readonly algorithim = 'aes-256-cbc';
  private readonly secretKey = crypto.randomBytes(32);
  private readonly iv = crypto.randomBytes(16);
  async createContact(
    name: string,
    email: string,
    phone: string,
    message: string,
    user: User,
  ): Promise<Contact> {
    return this.contactModel.create({ name, email, phone, message, user });
  }
  async getContactById(query): Promise<Contact> {
    return await this.contactModel.findById(query);
  }

  async encrypt(text: string): Promise<string> {
    const cipher = crypto.createCipheriv(
      this.algorithim,
      this.secretKey,
      this.iv,
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
  async decrypt(id: string, user: string): Promise<Contact> {
    const decipher = crypto.createDecipheriv(
      this.algorithim,
      this.secretKey,
      this.iv,
    );

    const contact = await this.contactModel.findById(id);
    let decyptedname = decipher.update(contact.name, 'hex', 'utf8');
    decyptedname += decipher.final('utf8');
    let decryptedemail = decipher.update(contact.email, 'hex', 'utf8');
    decryptedemail += decipher.final('utf8');
    let decryptedphone = decipher.update(contact.phone, 'hex', 'utf8');
    decryptedphone += decipher.final('utf8');
    let decryptedmessage = decipher.update(contact.message, 'hex', 'utf8');
    decryptedmessage += decipher.final('utf8');
    let decryptedcontact = {
      name: decyptedname,
      email: decryptedemail,
      phone: decryptedphone,
      message: decryptedmessage,
      user: user,
      _id: contact._id,
    };

    return decryptedcontact;
  }
}
