import 'reflect-metadata';

import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

import { PaginationDto } from './pagination.dto';

describe('PaginationDto tests', () => {
  it('Should validate with default values', async () => {
    const paginationDto = new PaginationDto();

    const errors = await validate(paginationDto);
    expect(errors.length).toBe(0);
  });

  it('Should validate with valid values', async () => {
    const paginationDto = new PaginationDto();

    paginationDto.page = 1;
    paginationDto.limit = 10;

    const errors = await validate(paginationDto);
    expect(errors.length).toBe(0);
  });

  it('Should not validate with invalid limit value', async () => {
    const paginationDto = new PaginationDto();

    paginationDto.limit = -1;

    const errors = await validate(paginationDto);
    errors.forEach((error) => {
      expect(error.constraints).toHaveProperty('min');
    });
  });

  it('Should not validate with invalid page value', async () => {
    const paginationDto = new PaginationDto();

    paginationDto.page = -1;

    const errors = await validate(paginationDto);
    errors.forEach((error) => {
      expect(error.constraints).toHaveProperty('min');
    });
  });

  it('Should validate values no be string', async () => {
    const input = { limit: '10', page: '1' };
    const dto = plainToInstance(PaginationDto, input);

    await validate(dto);
    expect(dto.limit).toBe(10);
    expect(dto.page).toBe(1);
  });
});
