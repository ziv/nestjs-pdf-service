import { Test, TestingModule } from '@nestjs/testing';
import {WritableStream} from 'memory-streams';
import { AppController } from './app.controller';
import { PdfService } from './pdf';

describe('AppController', () => {
  let ctrl: AppController;
  let pdf: PdfService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [PdfService],
    }).compile();

    ctrl = app.get<AppController>(AppController);
    pdf = app.get<PdfService>(PdfService);
  });

  describe('app.controller.health', () => {
    it('should return "OK"', () => {
      expect(ctrl.health()).toBe('OK');
    });
  });

  describe('app.controller.create', () => {
    it('should call PDF service', async done => {
      jest.spyOn(pdf, 'create').mockResolvedValue(Buffer.from('test'));
      const res = new WritableStream();

      // @ts-ignore
      await ctrl.create({html: '<p>test</p>'}, res);
      res.on('finish', () => {
        expect(res.toString()).toBe('test');
        done();
      });
    });
  });
});
