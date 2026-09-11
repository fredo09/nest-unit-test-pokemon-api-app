import { validate } from 'class-validator';

import { CreatePokmeonDto } from './../create-pokmeon.dto';

describe('Validate create-pokemonDto', () => {
  it('Should validate with default values', async () => {
    const createPokemonDto = new CreatePokmeonDto();

    createPokemonDto.name = 'Pikachu';
    createPokemonDto.type = 'Electric';

    const errors = await validate(createPokemonDto);
    expect(errors.length).toBe(0);
  });

  it('Should validate with name is not undefined', async () => {
    const createPokemonDto = new CreatePokmeonDto();

    createPokemonDto.name = undefined as unknown as string;
    createPokemonDto.type = 'Electric';

    const errors = await validate(createPokemonDto);
    errors.forEach((error) => {
      expect(error.constraints).toHaveProperty('isNotEmpty');
    });
  });

  it('Should validate with type is not undefined', async () => {
    const createPokemonDto = new CreatePokmeonDto();

    createPokemonDto.name = 'Pikachu';
    createPokemonDto.type = undefined as unknown as string;

    const errors = await validate(createPokemonDto);
    errors.forEach((error) => {
      expect(error.constraints).toHaveProperty('isNotEmpty');
    });
  });

  it('Should validate with name is not string', async () => {
    const createPokemonDto = new CreatePokmeonDto();

    createPokemonDto.name = 10 as unknown as string;
    createPokemonDto.type = 'Electric';

    const errors = await validate(createPokemonDto);

    errors.forEach((error) => {
      expect(error.constraints).toHaveProperty('isString');
    });
  });

  it('Should validate with type is not string', async () => {
    const createPokemonDto = new CreatePokmeonDto();

    createPokemonDto.name = 'Pikachu';
    createPokemonDto.type = 10 as unknown as string;

    const errors = await validate(createPokemonDto);
    errors.forEach((error) => {
      expect(error.constraints).toHaveProperty('isString');
    });
  });

  it('Should validate with hp is a be positive number', async () => {
    const createPokemonDto = new CreatePokmeonDto();

    createPokemonDto.name = 'Pikachu';
    createPokemonDto.type = 'Electric';
    createPokemonDto.hp = -10;

    const errors = await validate(createPokemonDto);
    const hpPropertyError = errors.find((error) => error.property === 'hp');

    // const contraints = hpPropertyError?.constraints;
    // expect(contraints).toEqual({ min: 'hp must not be less than 0' });

    expect(hpPropertyError).toBeDefined();
  });

  it('Should validate with sprites is not Array', async () => {
    const createPokemonDto = new CreatePokmeonDto();

    createPokemonDto.name = 'Pikachu';
    createPokemonDto.type = 10 as unknown as string;
    createPokemonDto.sprites = 'invalid-sprite' as unknown as string[];

    const errors = await validate(createPokemonDto);
    const spritesPropertyError = errors.find(
      (error) => error?.property === 'sprites',
    );

    expect(spritesPropertyError).toBeDefined();
  });

  it('Should validate with sprites is Array', async () => {
    const createPokemonDto = new CreatePokmeonDto();

    createPokemonDto.name = 'Pikachu';
    createPokemonDto.type = 10 as unknown as string;
    createPokemonDto.sprites = ['sprite1', 'sprite2'];

    const errors = await validate(createPokemonDto);
    const spritesPropertyError = errors.find(
      (error) => error?.property === 'sprites',
    );

    expect(spritesPropertyError).toBeUndefined();
  });
});
