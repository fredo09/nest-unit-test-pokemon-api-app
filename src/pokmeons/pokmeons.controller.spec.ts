import { Test, TestingModule } from '@nestjs/testing';
import { PokmeonsController } from './pokmeons.controller';
import { PokmeonsService } from './pokmeons.service';
import { PaginationDto } from 'src/shared';
import { Pokemon } from './entities/pokmeon.entity';

const mockPokemons: Pokemon[] = [
  {
    id: 1,
    name: 'bulbasaur',
    type: 'grass',
    hp: 45,
    sprites: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
    ],
  },
  {
    id: 2,
    name: 'ivysaur',
    type: 'grass',
    hp: 60,
    sprites: [
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png',
    ],
  },
];

const mockPokemonById: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  type: 'grass',
  hp: 45,
  sprites: [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  ],
};

const mockPokemonUpdated: Pokemon = {
  id: 1,
  name: 'bulbasaur 2',
  type: 'grass',
  hp: 45,
  sprites: [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
  ],
};

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

  it('Should execute findAll and check the result', async () => {
    const pokmeonPagination: PaginationDto = { limit: 10, page: 1 };

    //* Espia para ver si se llamo el findAll del servicio que ejecuta el findAll del controlador
    jest
      .spyOn(service, 'findAll')
      .mockImplementation(() => Promise.resolve(mockPokemons));

    const pokemons = await controller.findAll(pokmeonPagination);
    expect(pokemons).toBe(mockPokemons);
  });

  it('Should have called the service with the correct id findOne', async () => {
    const pokemonId = '1';
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(mockPokemonById));

    const pokemons = await controller.findOne(pokemonId);
    expect(pokemons).toBe(mockPokemonById);
  });
  it('Should have called the service with the correct id and data (updated)', async () => {
    const pokemonId = '1';

    jest
      .spyOn(service, 'update')
      .mockImplementation(() =>
        Promise.resolve('This action updates a 1 pokemon'),
      );

    const pokmeons = await controller.update(pokemonId, mockPokemonById);
    expect(pokmeons).toBe('This action updates a 1 pokemon');
  });
  it('Should have called the service with the correct id (delete)', async () => {
    const pokemonId = '1';

    jest
      .spyOn(service, 'remove')
      .mockImplementation(() =>
        Promise.resolve('This action removes a #1 pokmeon'),
      );

    const pokemons = await controller.remove(pokemonId);
    expect(pokemons).toBe('This action removes a #1 pokmeon');
  });
});
