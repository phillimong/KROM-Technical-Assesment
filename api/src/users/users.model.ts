import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Contact } from 'src/contacts/contacts.model';
import { IsEmail, IsString } from 'class-validator';
import * as mongooseUniqueValidator from 'mongoose-unique-validator';
export type UserDocument = User & Document;

@Schema()
export class User {
  //modify object ID to be a uuid

  @Prop()
  @IsString()
  username: string;

  @Prop()
  @IsString()
  password: string;

  @Prop({
    type: String,
    required: true,
    index: true,
    unique: true,
  })
  @IsEmail()
  email: string;

  //user has many contacts
  @Prop()
  contacts: Contact[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(mongooseUniqueValidator, {
  message: 'Email already exists.',
});
