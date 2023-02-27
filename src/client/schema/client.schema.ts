import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
@Schema()
export class Client {
  @Prop()
  email: string;
  @Prop()
  CF: string;
  @Prop()
  dataYear: number;
  @Prop()
  name: string;
  @Prop()
  lastName: string;
  @Prop()
  birthdate: Date;
  @Prop()
  birthplace: string;
  @Prop()
  PIVA: number;
  @Prop()
  residenceSince: Date;
  @Prop()
  residenceAddress: string;
  @Prop()
  ZIP: number;
  @Prop()
  city: string;
  @Prop()
  province: string;
  @Prop()
  CF5x1000: number;
  @Prop()
  name5x1000: string;
  @Prop()
  C8x1000: string;
  @Prop()
  civilStatus: string;
  @Prop()
  partnerCF: string;
  @Prop()
  partnerSince: number;
}
export const ClientSchema = SchemaFactory.createForClass(Client);
SchemaFactory.createForClass(Client).plugin(softDeletePlugin);
