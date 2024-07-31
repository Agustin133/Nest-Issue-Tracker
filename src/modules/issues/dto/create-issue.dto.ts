import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateIssueDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  creator: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  label: string;
}
