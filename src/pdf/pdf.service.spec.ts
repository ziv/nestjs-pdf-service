import { Test, TestingModule } from '@nestjs/testing';
import { PdfService } from './pdf.service';
import '../tests/to-be-pdf';

describe('PdfService', () => {
  let service: PdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfService],
    }).compile();

    service = module.get<PdfService>(PdfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create valid PDF', async () => {
    expect(await service.create({html: '<div>test</div>'})).toBePDF();
  });
});
