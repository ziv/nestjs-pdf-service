import { Injectable } from '@nestjs/common';
import { CreatePdf } from './pdf';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  async create(pdf: CreatePdf) {
    try {
      const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.setContent(pdf.html);
      const buffer = await page.pdf(pdf.options);
      await browser.close();
      return buffer;

    } catch (e) {
      throw new Error(`Error creating PDF file: ${e}`);
    }
  }
}
