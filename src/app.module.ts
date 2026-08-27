import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokmeonsModule } from './pokmeons/pokmeons.module';

@Module({
  imports: [PokmeonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
