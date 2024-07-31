import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Project {

  @Prop({required: true, unique: true, trim: true })
  id: number;

  @Prop()
  projectName: string;

  @Prop()
  owner: string;

  @Prop()
  members: [string];

}

export const projectSchema = SchemaFactory.createForClass(Project);
