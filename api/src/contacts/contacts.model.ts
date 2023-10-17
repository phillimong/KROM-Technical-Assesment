import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  //add Id definition
  // @Prop({ type: 'ObjectId' })
  // _id: object;
  //add autogenerate id
  @Prop({ type: 'ObjectId', auto: true })
  _id: object;
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  message: string;

  @Prop({ type: 'ObjectId', ref: 'User', required: true, index: true })
  user: object;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
