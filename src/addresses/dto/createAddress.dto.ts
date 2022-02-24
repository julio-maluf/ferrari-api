import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPostalCode,
  IsString,
} from 'class-validator';

export class CreateAddressDTO {
  @IsNumberString()
  @IsNotEmpty()
  personId: number;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsOptional()
  number?: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  @IsPostalCode('BR')
  zipCode: string;
}
