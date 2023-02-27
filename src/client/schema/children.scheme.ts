import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Children {
  @Prop()
  CF: string;
  @Prop()
  since: number;
  @Prop()
  deduction: number;
  @Prop()
  disability: boolean;


}
export const ChildrenSchema = SchemaFactory.createForClass(Children);