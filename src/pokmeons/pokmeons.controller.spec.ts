import { Test, TestingModule } from '@nestjs/testing';
import { PokmeonsController } from './pokmeons.controller';
import { PokmeonsService } from './pokmeons.service';

describe('PokmeonsController', () => {
  let controller: PokmeonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokmeonsController],
      providers: [PokmeonsService],
    }).compile();

    controller = module.get<PokmeonsController>(PokmeonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
