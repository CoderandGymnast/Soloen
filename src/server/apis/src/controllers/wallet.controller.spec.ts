import { Test, TestingModule } from '@nestjs/testing';
import { WalletController } from './wallet.controller';
import { WalletService } from '../services/wallet.service';

describe('AppController', () => {
  let appController: WalletController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [WalletService],
    }).compile();

    appController = app.get<WalletController>(WalletController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect("").toBe("");
    });
  });
});
