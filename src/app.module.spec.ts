import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokmeonsModule } from './pokmeons/pokmeons.module';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let pokmeonsModule: PokmeonsModule;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
    pokmeonsModule = moduleRef.get<PokmeonsModule>(PokmeonsModule);
  });

  describe('Validate config the app.module', () => {
    it('Should appController be defined', () => {
      expect(appController).toBeDefined();
    });

    it('Should appService be defined', () => {
      expect(appService).toBeDefined();
    });

    it('Should pokmeonsModule be defined', () => {
      expect(pokmeonsModule).toBeDefined();
    });
  });
});
