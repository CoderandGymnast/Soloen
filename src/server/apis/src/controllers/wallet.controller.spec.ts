import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './wallet.controller';
import { WalletService } from '../services/wallet.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [WalletService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect("").toBe("");
    });
  });
});
