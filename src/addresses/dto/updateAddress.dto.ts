import { CreateAddressDTO } from './createAddress.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateAddressDTO extends PartialType(CreateAddressDTO) {}
