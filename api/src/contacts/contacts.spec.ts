import { Test, TestingModule } from '@nestjs/testing';
import { Contacts } from './contacts.service';

describe('Contacts', () => {
  let provider: Contacts;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Contacts],
    }).compile();

    provider = module.get<Contacts>(Contacts);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
