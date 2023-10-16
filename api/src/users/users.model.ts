import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Contact } from 'src/contacts/contacts.model';

export type UserDocument = User & Document;

@Schema()
export class User {
  //modify object ID to be a uuid

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
