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
  UseGuards,
} from '@nestjs/common';
import { CreateTimeOptionDTO } from './dto/createTimeOptions.dto';
import { TimeOptionsService } from './time-options.service';

@Controller('time-options')
export class TimeOptionsController {
  constructor(private timeOptionsService: TimeOptionsService) {}

  @Get()
  async getAll() {
    return this.timeOptionsService.getAll();
  }

  @Get(':id')
  async getById(
    @Param(
      'id,',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.timeOptionsService.get(id);
  }

  // estrategia usando DTO no controller - os tipos do DTO não validam o tipo (string numérica)
  //@UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CreateTimeOptionDTO) {
    return this.timeOptionsService.create(data);
  }

  // estrategia não usando DTO no controller
  //@UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() data) {
    const { day, time } = data;
    const dataTimeOption = { id, day, time };
    return this.timeOptionsService.update(dataTimeOption);
  }

  //@UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.timeOptionsService.delete(id);
  }
}
