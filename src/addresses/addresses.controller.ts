import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDTO } from './dto/createAddress.dto';
import { UpdateAddressDTO } from './dto/updateAddress.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private addressService: AddressesService) {}

  @Get()
  async getAll() {
    return this.addressService.getAll();
  }

  @Get(':id')
  async getById(
    @Param(
      'id,',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.addressService.get(id);
  }

  @Post()
  async create(@Body() data: CreateAddressDTO) {
    return this.addressService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAddressDTO,
  ) {
    return this.addressService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.addressService.delete(id);
  }
}
