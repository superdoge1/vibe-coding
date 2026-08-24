import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const port = Number(process.argv[2]);
const base = process.argv[3];
if (!Number.isInteger(port) || !base?.startsWith('/') || !base.endsWith('/')) {
  throw new Error('Usage: node scripts/serve-dist.mjs <port> </base/>');
}

const root = resolve('dist');
const types = new Map([
  ['.css', 'text/css; charset=utf-8'], ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'], ['.js', 'text/javascript; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
]);

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  const relative = pathname.startsWith(base) ? pathname.slice(base.length) : null;
  let file = relative === null ? resolve(root, '404.html') : resolve(root, relative || 'index.html');
  if (relative?.endsWith('/')) file = resolve(root, relative, 'index.html');
  if (!file.startsWith(`${root}${sep}`) && file !== resolve(root, 'index.html')) file = resolve(root, '404.html');
  try {
    if (statSync(file).isDirectory()) file = resolve(file, 'index.html');
    statSync(file);
  } catch {
    file = resolve(root, '404.html');
  }
  response.statusCode = file === resolve(root, '404.html') ? 404 : 200;
  response.setHeader('Content-Type', types.get(extname(file)) ?? 'application/octet-stream');
  createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1');
