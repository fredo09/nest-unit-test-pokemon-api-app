import { validate } from 'class-validator';

import { UpdatePokmeonDto } from './../update-pokmeon.dto';

describe('Validate update-pokemonDto', () => {
  it('Should validate with default values', async () => {
    const updatePokemonDto = new UpdatePokmeonDto();

    updatePokemonDto.name = 'Pikachu';
    updatePokemonDto.type = 'Electric';

    const errors = await validate(updatePokemonDto);
    expect(errors.length).toBe(0);
  });

  it('Should validate with hp is a be positive number', async () => {
    const updatePokemonDto = new UpdatePokmeonDto();

    updatePokemonDto.name = 'Pikachu';
    updatePokemonDto.type = 'Electric';
    updatePokemonDto.hp = -10;

    const errors = await validate(updatePokemonDto);
    const hpPropertyError = errors.find((error) => error.property === 'hp');

    const contraints = hpPropertyError?.constraints;
    expect(contraints).toEqual({ min: 'hp must not be less than 0' });

    expect(hpPropertyError).toBeDefined();
  });

  it('Should validate with sprites is not Array', async () => {
    const updatePokemonDto = new UpdatePokmeonDto();

    updatePokemonDto.name = 'Pikachu';
    updatePokemonDto.type = 10 as unknown as string;
    updatePokemonDto.sprites = 'invalid-sprite' as unknown as string[];

    const errors = await validate(updatePokemonDto);
    const spritesPropertyError = errors.find(
      (error) => error?.property === 'sprites',
    );

    expect(spritesPropertyError).toBeDefined();
  });

  it('Should validate with sprites is Array', async () => {
    const updatePokemonDto = new UpdatePokmeonDto();

    updatePokemonDto.name = 'Pikachu';
    updatePokemonDto.type = 10 as unknown as string;
    updatePokemonDto.sprites = ['sprite1', 'sprite2'];

    const errors = await validate(updatePokemonDto);
    const spritesPropertyError = errors.find(
      (error) => error?.property === 'sprites',
    );

    expect(spritesPropertyError).toBeUndefined();
  });
});
