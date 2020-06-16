import {PDFOptions} from 'puppeteer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePdf {
  @IsString()
  @IsNotEmpty()
  html: string;

  @IsOptional()
  options?: PDFOptions;
}