import { Module } from '@nestjs/common';
import { PokmeonsService } from './pokmeons.service';
import { PokmeonsController } from './pokmeons.controller';

@Module({
  controllers: [PokmeonsController],
  providers: [PokmeonsService],
})
export class PokmeonsModule {}
