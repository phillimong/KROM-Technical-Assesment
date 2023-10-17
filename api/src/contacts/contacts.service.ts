import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './contacts.model';
import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'crypto';
import { promisify } from 'util';
import { User } from 'src/users/users.model';

const iv = randomBytes(16);
const password = 'Password used to generate key';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('contact') private contactModel: Model<ContactDocument>,
  ) {}
  async createContact(
    name: Buffer,
    email: Buffer,
    phone: Buffer,
    message: Buffer,
    user: User,
  ): Promise<Contact> {
    return this.contactModel.create({ name, email, phone, message, user });
  }
  async getContactById(query): Promise<Contact> {
    return await this.contactModel.findOne({ _id: query });
  }

  async encrypt(text: string): Promise<Buffer> {
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);
    let encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted;
  }
  async decrypt(value: Buffer): Promise<string> {
    //string to buffer
    const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    let decrypted = Buffer.concat([decipher.update(value), decipher.final()]);
    return decrypted.toString();
  }
}
