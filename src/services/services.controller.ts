import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private serviceService: ServicesService) {}

  // @Get()
  // async getAll() {
  //   return this.serviceService.getAll();
  // }

  // @Get(':id')
  // async getById(@Param('id') id: number) {
  //   return this.serviceService.get(id);
  // }

  // @Post()
  // async create(@Body() data) {
  //   return this.serviceService.create(data);
  // }

  // @Put(':id')
  // async update(@Param('id') id: number, @Body() data) {
  //   return this.serviceService.update(id, data);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return this.serviceService.delete(id);
  // }
}
