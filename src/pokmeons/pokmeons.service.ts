import { Injectable } from '@nestjs/common';
import { CreatePokmeonDto } from './dto/create-pokmeon.dto';
import { UpdatePokmeonDto } from './dto/update-pokmeon.dto';
import { PaginationDto } from 'src/shared';

import { Pokemon } from './entities/pokmeon.entity';
import { PokemonApiResponse } from './interfaces/pokeApi.response';
import { PokeApiPokemonResponsen } from './interfaces/pokeApiPokemon-response';

@Injectable()
export class PokmeonsService {
  //! Creando un valor para recuperar info de cache
  paginationPokemonsCache = new Map<string, Pokemon[]>();

  /**
   * this is a method that adds a new pokemon
   * @param createPokmeonDto the data of the pokemon to be added
   * @returns a string that indicates that the pokemon was added
   */
  create(createPokmeonDto: CreatePokmeonDto) {
    return 'This action adds a new pokmeon';
  }

  /**
   * this is a method that returns a list of pokemons with pagination
   * @param page the page number
   * @param limit the number of pokemons per page
   * @returns a list of pokemons
   */
  async findAll({ page = 1, limit = 10 }: PaginationDto): Promise<Pokemon[]> {
    const cacheKey = `${page}-${limit}`;

    if (this.paginationPokemonsCache.has(cacheKey))
      return this.paginationPokemonsCache.get(cacheKey)!;

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * limit}&limit=${limit}`;
    const response = await fetch(url);
    const data = (await response.json()) as PokemonApiResponse;

    const pokemonDetailsPromises = data.results.map((result) => {
      const url = result.url;
      const id = url.split('/').at(-2)!;
      return this.getPokemonInformation(+id);
    });

    const pokemons = await Promise.all(pokemonDetailsPromises);

    //! se guarda en cache el resultado de la paginacion para un nuevo resultado
    this.paginationPokemonsCache.set(cacheKey, pokemons);

    return pokemons;
  }

  /**
   * this is a method that returns a specific pokemon by its id
   * @param id the pokemon id
   * @returns the pokemon information
   */
  findOne(id: number) {
    return `This action returns a #${id} pokmeon`;
  }

  /**
   * this is a method that updates a specific pokemon by its id
   * @param id the pokemon id
   * @param updatePokmeonDto the data to update the pokemon
   * @returns a string that indicates that the pokemon was updated
   */
  update(id: number, updatePokmeonDto: UpdatePokmeonDto) {
    return `This action updates a #${id} pokmeon`;
  }

  /**
   * this is a method that removes a specific pokemon by its id
   * @param id the pokemon id
   * @returns a string that indicates that the pokemon was removed
   */
  remove(id: number) {
    return `This action removes a #${id} pokmeon`;
  }

  /**
   * this is a method that returns the information of a specific pokemon
   * @param id the pokemon id
   * @returns the pokemon information
   */
  private async getPokemonInformation(id: number): Promise<Pokemon> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = (await response.json()) as PokeApiPokemonResponsen;

    return {
      id: pokemonData.id,
      name: pokemonData.name,
      type: pokemonData.types[0].type.name,
      hp: pokemonData.stats[0].base_stat,
      sprites: [
        pokemonData.sprites.front_default,
        pokemonData.sprites.back_default,
      ],
    };
  }
}
