import { Test, TestingModule } from '@nestjs/testing';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';

describe('PublicationsController', () => {
  let controller: PublicationsController;

  const mockPublicationsService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicationsController],
      providers: [PublicationsService],
    })
    .overrideProvider(PublicationsService)
    .useValue(mockPublicationsService)
    .compile();

    controller = module.get<PublicationsController>(PublicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
