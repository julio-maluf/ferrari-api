import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeOptionDTO } from './dto/createTimeOptions.dto';
import { UpdateTimeOptionDTO } from './dto/UpdateTimeOption.dto';

@Injectable()
export class TimeOptionsService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.timeOption.findMany();
  }

  async get(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID is required');
    }

    const timeOption = await this.prismaService.timeOption.findUnique({
      where: {
        id,
      },
    });

    if (!timeOption) {
      throw new NotFoundException('Time option not found');
    }

    return timeOption;
  }

  async create(data: CreateTimeOptionDTO) {
    let { day, time } = data;

    if (!day) {
      throw new BadRequestException('Day is required');
    }

    if (!time) {
      throw new BadRequestException('Time is required');
    }

    day = Number(day);
    time = new Date(time);

    return this.prismaService.timeOption.create({
      data: {
        day,
        time,
      },
    });
  }

  async update(data: UpdateTimeOptionDTO) {
    let { id } = data;
    const { day, time } = data;

    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID is required');
    }

    const dataTimeOptions = {} as Prisma.TimeOptionUpdateInput;

    if (day) {
      dataTimeOptions.day = Number(day);
    }

    if (time) {
      dataTimeOptions.time = time;
    }

    const idTimeOption = await this.get(id);

    if (!idTimeOption) {
      throw new NotFoundException('ID not found');
    }

    return this.prismaService.timeOption.update({
      where: {
        id,
      },
      data: dataTimeOptions,
    });
  }

  async delete(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID is required');
    }

    const timeOption = await this.get(id);

    try {
      if (!timeOption) {
        throw new NotFoundException('Time option not found');
      }

      return this.prismaService.timeOption.delete({
        where: { id },
      });
    } catch (e) {
      return { error: 'Time option not found' };
    }
  }
}
