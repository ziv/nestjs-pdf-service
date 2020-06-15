import { Readable } from 'stream';

export const buffer2stream = (buf: Buffer): Readable => {
  const stream = new Readable();
  stream.push(buf);
  stream.push(null);
  return stream;
}