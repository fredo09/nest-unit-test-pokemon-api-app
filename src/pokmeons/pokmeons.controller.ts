import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PokmeonsService } from './pokmeons.service';
import { CreatePokmeonDto } from './dto/create-pokmeon.dto';
import { UpdatePokmeonDto } from './dto/update-pokmeon.dto';

@Controller('pokmeons')
export class PokmeonsController {
  constructor(private readonly pokmeonsService: PokmeonsService) {}

  @Post()
  create(@Body() createPokmeonDto: CreatePokmeonDto) {
    return this.pokmeonsService.create(createPokmeonDto);
  }

  @Get()
  findAll() {
    return this.pokmeonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokmeonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokmeonDto: UpdatePokmeonDto) {
    return this.pokmeonsService.update(+id, updatePokmeonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokmeonsService.remove(+id);
  }
}
