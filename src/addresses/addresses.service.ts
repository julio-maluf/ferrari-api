import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDTO } from './dto/createAddress.dto';
import { UpdateAddressDTO } from './dto/updateAddress.dto';

@Injectable()
export class AddressesService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return this.prismaService.address.findMany();
  }

  async get(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID is required');
    }

    const address = await this.prismaService.address.findUnique({
      where: {
        id,
      },
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  async create(data: CreateAddressDTO) {
    const {
      street,
      district,
      number,
      complement,
      city,
      state,
      country,
      zipCode,
      personId,
    } = data;

    // if (!street) {
    //   throw new BadRequestException('Street is required');
    // }

    const { id } = await this.prismaService.user.findUnique({
      where: {
        id: Number(personId),
      },
    });

    if (!id) {
      throw new NotFoundException('User not found');
    }

    return this.prismaService.address.create({
      data: {
        personId: Number(id),
        street,
        number,
        complement,
        district,
        city,
        state,
        country,
        zipCode: zipCode.replace('-', ''),
      },
    });
  }

  async update(id: number, data: UpdateAddressDTO) {
    if (data.zipCode) {
      data.zipCode = data.zipCode.replace('-', '');
    }

    await this.get(Number(id));

    return this.prismaService.address.update({
      data,
      where: { id: Number(id) },
    });
  }

  async delete(id: number) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID is required');
    }

    await this.get(id);

    return this.prismaService.address.delete({
      where: { id },
    });
  }
}
