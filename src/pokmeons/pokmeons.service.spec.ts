import { Test, TestingModule } from '@nestjs/testing';
import { PokmeonsService } from './pokmeons.service';
// import { NotFoundException } from '@nestjs/common';

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

  describe('Validate methods of PokemonsService', () => {
    it('Should create a new pokemon', async () => {
      const mockPokemon = { name: 'Pikachu', type: 'Electric' };

      const result = await service.create(mockPokemon);

      expect(result).toBe('This action adds a new pokmeon Pikachu');
    });

    it('Should return a pokemon by id', async () => {
      const idPokemon = 1;
      const mockPokemonById = {
        id: 1,
        name: 'bulbasaur',
        type: 'grass',
        hp: 45,
        sprites: [
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        ],
      };

      const result = await service.findOne(idPokemon);
      // console.log('🚀 ~ result:', result);
      expect(result).toEqual(mockPokemonById);
    });

    it('Should validate error 404 whent pokemon not found', async () => {
      const idPokemon = 40000;
      //! forma de evauar alguna excepcion y comprobar que el servicio responde con un 404
      // await expect(service.findOne(40000)).rejects.toThrow(NotFoundException);

      //! aqui validamos el texto de la excepcion
      await expect(service.findOne(idPokemon)).rejects.toThrow(
        `Pokemon with id ${idPokemon} not found`,
      );
    });

    it('Should validate list pokemons by pagination', async () => {
      const mockListPokemons = [
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
        {
          id: 3,
          name: 'venusaur',
          type: 'grass',
          hp: 80,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png',
          ],
        },
        {
          id: 4,
          name: 'charmander',
          type: 'fire',
          hp: 39,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png',
          ],
        },
        {
          id: 5,
          name: 'charmeleon',
          type: 'fire',
          hp: 58,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/5.png',
          ],
        },
        {
          id: 6,
          name: 'charizard',
          type: 'fire',
          hp: 78,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
          ],
        },
        {
          id: 7,
          name: 'squirtle',
          type: 'water',
          hp: 44,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png',
          ],
        },
        {
          id: 8,
          name: 'wartortle',
          type: 'water',
          hp: 59,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/8.png',
          ],
        },
        {
          id: 9,
          name: 'blastoise',
          type: 'water',
          hp: 79,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png',
          ],
        },
        {
          id: 10,
          name: 'caterpie',
          type: 'bug',
          hp: 45,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10.png',
          ],
        },
      ];

      const listPokemons = await service.findAll({ limit: 10, page: 1 });
      expect(listPokemons).toEqual(mockListPokemons);
      //! validamos el tipo de dato que regresa el servicio
      // expect(listPokemons).toBeInstanceOf(Array);
    });

    it('Should validate list pokemons by pagination without parameters', async () => {
      const mockListPokemons = [
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
        {
          id: 3,
          name: 'venusaur',
          type: 'grass',
          hp: 80,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png',
          ],
        },
        {
          id: 4,
          name: 'charmander',
          type: 'fire',
          hp: 39,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png',
          ],
        },
        {
          id: 5,
          name: 'charmeleon',
          type: 'fire',
          hp: 58,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/5.png',
          ],
        },
        {
          id: 6,
          name: 'charizard',
          type: 'fire',
          hp: 78,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
          ],
        },
        {
          id: 7,
          name: 'squirtle',
          type: 'water',
          hp: 44,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png',
          ],
        },
        {
          id: 8,
          name: 'wartortle',
          type: 'water',
          hp: 59,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/8.png',
          ],
        },
        {
          id: 9,
          name: 'blastoise',
          type: 'water',
          hp: 79,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png',
          ],
        },
        {
          id: 10,
          name: 'caterpie',
          type: 'bug',
          hp: 45,
          sprites: [
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10.png',
          ],
        },
      ];
      const listPokemons = await service.findAll({});
      expect(listPokemons).toEqual(mockListPokemons);
    });

    it('Should return pagination cache', async () => {
      await service.findAll({ limit: 10, page: 1 });

      expect(service.paginationPokemonsCache.has('1-10')).toBeTruthy();
    });

    it('Should return pagination cache', async () => {
      // const listPokemons = await service.findAll({ limit: 10, page: 1 });
      // expect(service.paginationPokemonsCache.has('1-10')).toEqual(listPokemons);
    });

    it('Should check properties of list pokemons', async () => {
      const idPokemon = 4;
      const pokemon = await service.findOne(idPokemon);

      // expect(pokemon).toHaveProperty('name');
      expect(pokemon).toEqual(
        expect.objectContaining({
          id: idPokemon,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          hp: expect.any(Number),
        }),
      );
    });
  });
});
