import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PokmeonsService } from './pokmeons.service';
import { CreatePokmeonDto } from './dto/create-pokmeon.dto';
import { UpdatePokmeonDto } from './dto/update-pokmeon.dto';
import { PaginationDto } from '../shared';

@Controller('pokmeons')
export class PokmeonsController {
  constructor(private readonly pokmeonsService: PokmeonsService) {}

  /**
   * this is a method that creates a new pokemon
   * @param createPokmeonDto the data of the pokemon to be created
   * @returns the created pokemon
   */
  @Post()
  create(@Body() createPokmeonDto: CreatePokmeonDto) {
    return this.pokmeonsService.create(createPokmeonDto);
  }

  /**
   * this is a method that retrieves all pokemons with pagination
   * @param paginationDto the pagination data
   * @returns a list of pokemons
   */
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokmeonsService.findAll(paginationDto);
  }

  /**
   * this is a method that retrieves a specific pokemon by its id
   * @param id the pokemon id
   * @returns the pokemon with the specified id
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokmeonsService.findOne(+id);
  }

  /**
   * this is a method that updates a specific pokemon by its id
   * @param id the pokemon id
   * @param updatePokmeonDto the data of the pokemon to be updated
   * @returns a string that indicates that the pokemon was updated
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokmeonDto: UpdatePokmeonDto) {
    return this.pokmeonsService.update(+id, updatePokmeonDto);
  }

  /**
   * this is a method that deletes a specific pokemon by its id
   * @param id the pokemon id
   * @returns a string that indicates that the pokemon was deleted
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokmeonsService.remove(+id);
  }
}
