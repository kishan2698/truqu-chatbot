import { Test, TestingModule } from '@nestjs/testing';
import { LatestFeedBackService } from './latest-feed-back.service';

describe('LatestFeedBackService', () => {
  let service: LatestFeedBackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LatestFeedBackService],
    }).compile();

    service = module.get<LatestFeedBackService>(LatestFeedBackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
