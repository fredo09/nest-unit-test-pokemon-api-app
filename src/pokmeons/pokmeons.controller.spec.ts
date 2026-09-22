import { Test, TestingModule } from '@nestjs/testing';
import { PokmeonsController } from './pokmeons.controller';
import { PokmeonsService } from './pokmeons.service';
import { PaginationDto } from 'src/shared';

describe('PokmeonsController', () => {
  let controller: PokmeonsController;
  let service: PokmeonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokmeonsController],
      providers: [PokmeonsService],
    }).compile();

    controller = module.get<PokmeonsController>(PokmeonsController);
    service = module.get<PokmeonsService>(PokmeonsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should execute findAll', async () => {
    const pokmeonPagination: PaginationDto = { limit: 10, page: 1 };

    //* Espia para ver si se llamo el findAll del servicio que ejecuta el findAll del controlador
    const findAllSpy = jest.spyOn(service, 'findAll');

    await controller.findAll(pokmeonPagination);
    expect(findAllSpy).toHaveBeenCalledWith(pokmeonPagination);
  });
});
