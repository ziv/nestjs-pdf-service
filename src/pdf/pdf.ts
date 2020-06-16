import {PDFOptions} from 'puppeteer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePdf {
  @IsString()
  @IsNotEmpty()
  html: string;

  // todo add validation
  @IsOptional()
  options?: PDFOptions;
}