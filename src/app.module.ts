import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PdfService } from './pdf';

@Module({
  controllers: [AppController],
  providers: [PdfService],
})
export class AppModule {}
