import { Body, Controller, Get, Header, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePdf, PdfService } from './pdf';
import { Response } from 'express';
import { buffer2stream } from './utils';

@Controller()
export class AppController {
  constructor(private readonly pdfService: PdfService) {}

  @Get()
  health(): string {
    return 'OK';
  }

  @Post('/create')
  @UsePipes(new ValidationPipe())
  @Header('Cache-Control', 'no-store')
  @Header('Content-Type', 'application/pdf')
  async create(@Body() createPdf: CreatePdf, @Res() res: Response) {
    buffer2stream(await this.pdfService.create(createPdf)).pipe(res);
  }
}
