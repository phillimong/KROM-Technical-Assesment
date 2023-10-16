import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './contacts.model';
import * as crypto from 'crypto';

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
  ): Promise<Contact> {
    return this.contactModel.create({ name, email, phone, message });
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
  async decrypt(text: string): Promise<string> {
    const decipher = crypto.createDecipheriv(
      this.algorithim,
      this.secretKey,
      this.iv,
    );
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
