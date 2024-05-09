import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AvatarDocument = Avatar & Document;

@Schema()
export class Avatar {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop()
  hash: string;

  @Prop({ required: true })
  url: string;

  @Prop()
  file: string;
}

export const AvatarSchema = SchemaFactory.createForClass(Avatar);
