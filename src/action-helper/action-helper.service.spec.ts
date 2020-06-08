import { Test, TestingModule } from '@nestjs/testing';
import { ActionHelperService } from './action-helper.service';

describe('ActionHelperService', () => {
  let service: ActionHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActionHelperService],
    }).compile();

    service = module.get<ActionHelperService>(ActionHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
