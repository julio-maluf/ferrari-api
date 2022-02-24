import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prismaService: PrismaService) {}

  // async getAll() {
  //   return this.prismaService.service.findMany();
  // }

  // async get(id: number) {
  //   id = Number(id);

  //   if (isNaN(id)) {
  //     throw new BadRequestException('ID is required');
  //   }

  //   const service = await this.prismaService.service.findUnique({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!service) {
  //     throw new NotFoundException('Service not found');
  //   }

  //   return service;
  // }

  // async create({}) {
  //   return {};
  // }

  // async update(id: number, {}) {
  //   return {};
  // }

  // async delete(id: number) {
  //   return {};
  // }
}
