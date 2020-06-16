import { PDFDocument } from 'pdf-lib';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBePDF(): R;
    }
  }
}

expect.extend({
  async toBePDF(received: string) {
    try {
      await PDFDocument.load(Buffer.from(received));
      return { pass: true, message: () => '' };
    } catch (e) {
      return { pass: false, message: () => 'value is not valid PDF' }
    }
  }
});
