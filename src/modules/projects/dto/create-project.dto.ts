
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsOptional()
  members: [string];
}
