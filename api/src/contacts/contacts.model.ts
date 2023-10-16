import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  message: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  user: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
