import { Injectable } from '@nestjs/common';
import { CreatePokmeonDto } from './dto/create-pokmeon.dto';
import { UpdatePokmeonDto } from './dto/update-pokmeon.dto';

@Injectable()
export class PokmeonsService {
  create(createPokmeonDto: CreatePokmeonDto) {
    return 'This action adds a new pokmeon';
  }

  findAll() {
    return `This action returns all pokmeons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokmeon`;
  }

  update(id: number, updatePokmeonDto: UpdatePokmeonDto) {
    return `This action updates a #${id} pokmeon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokmeon`;
  }
}
