import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from '../addresses.controller';
import { AddressesService } from '../addresses.service';
import { CreateAddressDTO } from '../dto/createAddress.dto';
import { UpdateAddressDTO } from '../dto/updateAddress.dto';

// describe é a suite (grupo) de testes
describe('AddressesController', () => {
  let controller: AddressesController;

  const mockAddressesService = {
    // simular uma função
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn((id, dtoUpdate) => {
      return {
        id: Date.now(),
        ...dtoUpdate,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [AddressesService],
    })
      // sobreescrever o Provider usando o valor mockAddressesService
      .overrideProvider(AddressesService)
      .useValue(mockAddressesService)
      .compile();

    controller = module.get<AddressesController>(AddressesController);
  });

  const dto = {
    personId: 1,
    street: 'Av. Paulista',
    number: '1000',
    complement: 'b',
    district: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    zipCode: '01311100',
  } as CreateAddressDTO;

  const dtoUpdate = {
    id: Date.now(),
    personId: 1,
    street: 'Av. Paulista',
    number: '1000',
    complement: 'b',
    district: 'Jardins',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
    zipCode: '01311100',
  } as UpdateAddressDTO;

  const id = Date.now();

  it('should create user', async () => {
    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
  });

  it('should create in the AddressesService', () => {
    expect(mockAddressesService.create).toHaveBeenCalled();
    expect(mockAddressesService.create).toHaveBeenCalledWith(dto);
  });

  it('should update user', async () => {
    expect(await controller.update(id, dtoUpdate)).toEqual({
      ...dtoUpdate,
    });
  });

  // it('should update in the AddressesService', () => {
  //   expect(mockAddressesService.update).toHaveBeenCalled();
  //   expect(mockAddressesService.update).toHaveBeenNthCalledWith(1, id);
  //   expect(mockAddressesService.update).toHaveBeenNthCalledWith(2, dto);
  // });
});
