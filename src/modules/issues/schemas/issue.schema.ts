import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Issue {

  @Prop({required: true, unique: true, trim: true })
  id: number;

  @Prop()
  name: string;

  @Prop()
  creator: string;

  @Prop()
  description: string;

  @Prop()
  label: string;
}

export const issueShcema = SchemaFactory.createForClass(Issue);
