import { NestFactory } from '@nestjs/core';
import { bootstrap } from './main';
import { AppModule } from './app.module';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      useGlobalPipes: jest.fn(),
      setGlobalPrefix: jest.fn(),
      listen: jest.fn(),
    }),
  },
}));

describe('Main ts', () => {
  let mockApp = {
    useGlobalPipes: jest.mock,
    setGlobalPrefix: jest.mock,
    listen: jest.mock,
  };

  beforeEach(() => {
    mockApp = {
      useGlobalPipes: jest.fn(),
      setGlobalPrefix: jest.fn(),
      listen: jest.fn(),
    };

    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
  });

  it('Should execute Main ts', async () => {
    await bootstrap();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
  });

  it('Should execute global prefix', async () => {
    await bootstrap();

    expect(mockApp.setGlobalPrefix).toHaveBeenCalledWith('api');
  });

  it('Should execute serve on port 3000', async () => {
    await bootstrap();

    expect(mockApp.listen).toHaveBeenCalledWith(3000);
  });

  it('Should execute serve on port with env', async () => {
    process.env.PORT = '4200';
    await bootstrap();

    expect(mockApp.listen).toHaveBeenCalledWith(process.env.PORT);
  });

  it('Should execute useGlobalPipes', async () => {
    process.env.PORT = '4200';
    await bootstrap();

    expect(mockApp.useGlobalPipes).toHaveBeenCalled();
  });

  it('should use global pipes', async () => {
    await bootstrap();

    expect(mockApp.useGlobalPipes).toHaveBeenCalledWith(
      expect.objectContaining({
        errorHttpStatusCode: 400,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        validatorOptions: expect.objectContaining({
          forbidNonWhitelisted: true,
          whitelist: true,
        }),
      }),
    );
  });
});
