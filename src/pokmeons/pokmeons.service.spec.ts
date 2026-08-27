import { Test, TestingModule } from '@nestjs/testing';
import { PokmeonsService } from './pokmeons.service';

describe('PokmeonsService', () => {
  let service: PokmeonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokmeonsService],
    }).compile();

    service = module.get<PokmeonsService>(PokmeonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
