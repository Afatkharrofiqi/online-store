import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${__dirname}/.env`);
  const filename: string = env ? `${env}.env` : 'development.env';
  let filePath: string = resolve(`${__dirname}/${filename}`);
  if (!existsSync(filePath)) {
    filePath = fallback;
  }
  return filePath;
}
