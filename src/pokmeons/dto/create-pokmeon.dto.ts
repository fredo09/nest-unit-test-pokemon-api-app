import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

/**
 * This is a data transfer object (DTO) class for creating a new pokmeon.
 * It is used to define the structure of the data that is sent in the request body when creating a new pokmeon.
 * */
export class CreatePokmeonDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  type!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  hp?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) //! todos los elmentos del array deben ser strings
  sprites?: string[];
}
