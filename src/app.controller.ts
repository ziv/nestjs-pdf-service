import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePdf, PdfService } from './pdf';

@Controller()
export class AppController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  health(): string {
    return 'OK';
  }

  @Post('/create')
  async create(@Body() createPdf: CreatePdf) {
    return this.pdfService.create(createPdf);
  }
}
